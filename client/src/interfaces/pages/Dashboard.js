import gif_loading from '../../img/loading.gif'
import svg_user from '../../img/icons/user.svg'
import svg_logoUnmodified from '../../img/logo-unmodified.svg'
import svg_mail from '../../img/icons/mail.svg'

import { useEffect, useState } from 'react'
import InputField from '../InputField'
import DashboardOrder from '../DashboardOrder'
import { setPageTitle, validateEmail } from '../../core/utils'

const Dashboard = () =>
{
    const [isFirstLoad, setIsFirstLoad]       = useState(true)
    const [email, setEmail]                   = useState('')
    const [isLoading, setIsLoading]           = useState(false)
    const [isOrdersLoaded, setIsOrdersLoaded] = useState(false)
    const [orders, setOrders]                 = useState([])
    const [message, setMessage]               = useState('Enter your email you used when ordering your packages to see information on your previous orders.')

    const loadOrders = async () =>
    {
        setIsLoading(true)

        if (email.length > 0)
        {
            if (!validateEmail(email))
            {
                setMessage('Please enter a valid email adress.')
                setIsLoading(false)

                return
            }
        }
        else
        {
            setMessage('Please enter a the email adress associated with the orders.')
            setIsLoading(false)

            return
        }

        const _GetOrders = await fetch('/get-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })

        const { list } = await _GetOrders.json()

        setOrders(list)
        setIsLoading(false)
        setIsOrdersLoaded(true)
    }

    if (isFirstLoad)
    {
        setPageTitle('Dashboard')
        setIsFirstLoad(false)
    }

    return(
        <div className='Page-module'>
            <div className='Section-module--content encompass--height'>
                <div className='DashboardLogin-module'
                    style={{display: isOrdersLoaded ? 'none' : 'block'}}>
                    <img
                        className='DashboardLogin-module--img'
                        src={ svg_logoUnmodified }
                        alt='User' />
                    <div className='DashboardLogin-module--title'>Dashboard</div>
                    <div className='DashboardLogin-module--message'>
                        { isLoading ? 'Loading orders...' : message }
                    </div>
                    <InputField
                        title='Email'
                        placeholder='me@example.com'
                        oc={ (e) =>
                        {
                            setEmail(e.target.value)
                        } } />
                    <img
                        className='DashboardLogin-module--loading'
                        style={{display: isLoading ? 'block' : 'none'}}
                        src={ gif_loading }
                        alt='Loading' />
                    <button
                        style={{display: isLoading ? 'none' : 'block'}}
                        onClick={ () =>
                        {
                            loadOrders()
                        } }>
                        Continue
                    </button>
                </div>
                <div className='DashboardList-module'
                    style={{display: isOrdersLoaded ? 'block' : 'none'}}>
                    <div className='DashboardList-module--title'>Orders</div>
                    <div className='DashboardList-module--email'>{ email }</div>
                    { orders.length > 0 ? orders.map((o) => 
                    (
                        <DashboardOrder 
                            orderData={ o } 
                            key={ Math.random() } />
                    )) 
                    : <div className='DashboardList-module--empty'>
                        <div className='DashboardList-module--empty--title'>No orders yet</div>
                        <div>Go to store to place an order.</div>
                    </div> }
                </div>
            </div>
        </div>
    )
}

export default Dashboard