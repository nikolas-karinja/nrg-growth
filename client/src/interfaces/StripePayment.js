import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { Data } from '../core'
import { getUnixTimestamp, validateEmail } from '../core/utils'
import DataBlock from './DataBlock'

const StripePayment = ({ onPaymentSuccess, packageData }) =>
{
    const [message, setMessage]     = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const _Stripe   = useStripe()
    const _Elements = useElements()

    useEffect(() => {
        if (!_Stripe) 
        {
            return
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        )
    
        if (!clientSecret) 
        {
            return
        }
    
        _Stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => 
        {
            switch (paymentIntent.status) 
            {
                case "succeeded":
                    setMessage("Payment succeeded!")

                    onPaymentSuccess()
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [_Stripe])

    const handleError = (error) => 
    {
        setIsLoading(false)
        setMessage(error.message)
    }

    const handleSubmit = async (e) => 
    {
        e.preventDefault()

        setMessage("Processing payment...")
    
        if (!_Stripe) 
        {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        // make sure name isn't empty
        if (!Data.Checkout.name || (Data.Checkout.name && !Data.Checkout.name.length > 0))
        {
            setMessage(`You must enter your name.`)

            return
        }

        // make sure email is valid
        if (!Data.Checkout.email || (Data.Checkout.email && !validateEmail(Data.Checkout.email)))
        {
            setMessage(`Email isn't properly formatted.`)

            return
        }

        setIsLoading(true)
         
        // Trigger form validation and wallet collection
        const { error: submitError } = await _Elements.submit()

        if (submitError) 
        {
            handleError(submitError)
            return
        }

        // Create the subscription
        const _InitCharge = await fetch('/create-init-charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email       : Data.Checkout.email,
                name        : Data.Checkout.name,
                phone       : Data.Checkout.phoneNumber,
                packageName : packageData.name,
                femaleType  : Data.Checkout.followerType === 'Female',
                usaLocation : Data.Checkout.followerLocation === 'USA',
            })
        })

        const { paymentIntent, totalPrice } = await _InitCharge.json()

        const { error } = await _Stripe.confirmPayment({
            elements: _Elements,
            clientSecret: paymentIntent,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.href,
            },
            redirect: 'if_required',
        })

        if (error)
        {
            setMessage(error.message)
        }
        else
        {
            const _CreateOrder = await fetch('/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalPrice,
                    date          : getUnixTimestamp(),
                    email         : Data.Checkout.email,
                    packageName   : packageData.name,
                    instaUsername : Data.Checkout.instaUsername,
                    femaleType    : Data.Checkout.followerType === 'Female',
                    usaLocation   : Data.Checkout.followerLocation === 'USA',
                })
            })

            const { success } = await _CreateOrder.json()

            if (success)
            {
                onPaymentSuccess()
            }
            else
            {
                setMessage('Something unexpected happened with your order.')
            }
        }
    
        setIsLoading(false)
    }
    
    const _PAYMENT_ELEMENT_OPTIONS = {
        layout: "tabs",
    }

    return(
        <form 
            id='payment-form'
            onSubmit={ handleSubmit }>
            <PaymentElement className='CheckoutSummary-module--paymentForm'
                id='payment-element'
                options={ _PAYMENT_ELEMENT_OPTIONS } />

            <div className='divider' />

            <div className='CheckoutSummary-module--price--title'>Payment Breakdown</div>
            
            <DataBlock
                name='Base Package'
                data={ `$${ packageData.discountPrice[0] }` } />
            <DataBlock
                hide={ Data.Checkout.followerType !== 'Female' }
                name='All Female Followers'
                data={ `$${ packageData.femalePrice[0] }` } />
            <DataBlock
                hide={ Data.Checkout.followerLocation !== 'USA' }
                name='All USA Followers'
                data={ `$${ packageData.usaPrice[0] }` } />
            <DataBlock
                name='Processing Fee'
                data={ `$${ packageData.processingFee[0] }` } />

            <div className='divider' />

            <div className='CheckoutSummary-module--price'>
                <span className='bold'>Total Due: </span>${ (packageData.discountPrice[0] 
                    + packageData.processingFee[0]
                    + (Data.Checkout.followerType === 'Female' ? packageData.femalePrice[0] : 0)
                    + (Data.Checkout.followerLocation === 'USA' ? packageData.usaPrice[0] : 0)).toFixed(2) }
            </div>
            <button
                disabled={ isLoading || !_Stripe || !_Elements }
                id='submit'>
                Pay Now
            </button>
            { message && <div id='payment-message'>{ message }</div> }
        </form>
    )
}

export default StripePayment