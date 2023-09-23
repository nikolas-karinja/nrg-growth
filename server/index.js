// server/index.js
import { ApifyClient } from 'apify-client'
import express from 'express'
import bodyParser from 'body-parser'
import * as Packages from './packages.js'
import stripe from 'stripe'
import { getPackageData, getPackagePrice } from './utils.js'
import { MongoClient } from 'mongodb'
import { Customer } from './core/Customer.js'
import { Order } from './core/Order.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { XMLHttpRequest } from 'xmlhttprequest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LIVE = false
const PORT = process.env.PORT || 4242

const App = express();
const Stripe = stripe('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')
// Initialize the ApifyClient with API token
const Client_Appify = new ApifyClient({ token: 'apify_api_a7VafBDpEozOixWzQvDGlcNeeGoMYS15diVE' })
const Client_DB     = new MongoClient('mongodb+srv://nikolas-karinja:zWWElTZVcsOBDSFE@ngr-growth.pce0mew.mongodb.net/?retryWrites=true&w=majority')

const JAP_Url = 'https://justanotherpanel.com/api/v2'
const JAP_Key = '83f499b7c9b8ef48accc9d7b37f1a1bc'

//
App.use(express.static(path.resolve(__dirname, '../client/build')))
App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json())

App.get('*', (req, res) => 
{
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

App.listen(PORT, () => 
{
    console.log(`Server listening on ${PORT}`)
})

const initServer = async () =>{
	console.clear()
	console.log('Connecting to DB...')

	await Client_DB.connect()

	console.clear()
	console.log('Connected! Database available for use.')

	App.post('/get-packages', async (req, res) => 
	{
		res.json({ list: Packages.list })
	})

	// this is used in the dashboard to show the orders by email
	App.post('/get-orders', async (req, res) => 
	{
		const _DB_Orders       = Client_DB.db('orders')
		const _COLL_pastOrders = _DB_Orders.collection('past')

		const _Query   = { email: req.body.email }
		const _Result  = await _COLL_pastOrders.find(_Query)
		const _ResList = await _Result.toArray()

		res.json({ list: _ResList.length > 0 ? _ResList : [] })
	})

	// when the payment is authorized and order can proceed
	App.post('/create-order', async (req, res) => 
	{
		const _DB_Orders       = Client_DB.db('orders')
		const _COLL_pastOrders = _DB_Orders.collection('past')

		const _PackageData = await getPackageData(req.body.packageName)

		await _COLL_pastOrders.insertOne(new Order(req.body, _PackageData.followers))

		let _orderData = []

		const _OrderObj = {
			key: JAP_Key, 
			action: 'add',
			service: Packages.SERVICE_ID, 
			link: req.body.instaUsername, 
			quantity: _PackageData.followers,
		}

		for (const i in _OrderObj)
		{
			_orderData.push(i + '=' + encodeURIComponent(_OrderObj[i]))
		}

		const _XHR = new XMLHttpRequest()
        _XHR.open('POST', JAP_Url, false)
        _XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        _XHR.send(_orderData.join('&'))

		let _orderResult = _XHR.responseText

        if (_XHR.status !== 200 && _orderResult === '') 
		{
            _orderResult = 'Order to JAP has failed.'
        }

        console.log(`JAP - ${ _orderResult }`)

		res.json({ success: true })
	})

	// when the customer is charged on the checkout
	App.post('/create-init-charge', async (req, res) => 
	{
		let _Customer = null

		const _packageName = req.body.packageName
		const _femaleType  = req.body.femaleType
		const _usaLocation = req.body.usaLocation

		const _PackageData = await getPackageData(_packageName)

		const _packagePriceStripe = getPackagePrice(true, _PackageData, _femaleType, _usaLocation)
		const _packagePriceUsd    = getPackagePrice(false, _PackageData, _femaleType, _usaLocation)

		const _DB_Customers           = Client_DB.db('customers')
		const _COLL_existingCustomers = _DB_Customers.collection('existing')

		const _Query  = { email: req.body.email }
		const _Result = await _COLL_existingCustomers.findOne(_Query)

		if (_Result)
		{
			_Customer = await Stripe.customers.retrieve(_Result.stripeId)
		}
		else
		{
			_Customer = await Stripe.customers.create({
				email : req.body.email,
				name  : req.body.name,
				phone : req.body.phone,
			})

			await _COLL_existingCustomers.insertOne(new Customer(
				req.body.name,
				req.body.email,
				req.body.phone,
				_Customer.id))
		}

		const _EphemeralKey = await Stripe.ephemeralKeys.create(
			{ customer: _Customer.id },
			{ apiVersion: '2020-03-02' })

		const _InitCharge = await Stripe.paymentIntents.create({
			customer           : _Customer.id,
			setup_future_usage : 'off_session',
			amount             : _packagePriceStripe,
			currency           : 'usd',

			automatic_payment_methods: {
				enabled: true,
			},
		})

		res.json({
			totalPrice     : _packagePriceUsd,
			paymentIntent  : _InitCharge.client_secret,
			ephemeralKey   : _EphemeralKey.secret,
			customer       : _Customer.id,
			publishableKey : 'pk_test_hcsPWA3mYYWaO0yrtaNCshlG00zsGLI8ff',
		})
	})

	App.post('/pi', async (req, res) =>
	{
    	let _Data = null

    	for (let _p of Packages.list)
    	{
        	if (_p.name === req.body.packageName)
        	{
            	_Data = _p

            	break
        	}
    	}

    	res.json({ data: _Data })
	})

	App.post('/siu', async (req, res) => 
	{
    	// Prepare Actor input
    	const Input = { 'usernames': [ req.body.username ] }

    	// Run the Actor and wait for it to finish
    	const Run = await Client_Appify.actor('apify/instagram-profile-scraper').call(Input)

    	// Fetch and print Actor results from the run's dataset (if any)
    	const { items } = await Client_Appify.dataset(Run.defaultDatasetId).listItems()

		console.log(items[0])

    	res.json({ userdata: items.length > 0 ? items[0] : null })
	})
}

initServer()