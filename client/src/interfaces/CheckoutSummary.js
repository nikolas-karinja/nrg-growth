import '../sass/modules.sass'

import svg_mail from '../img/icons/mail.svg'
import svg_phone from '../img/icons/phone.svg'
import svg_user from '../img/icons/user.svg'

import { Data } from '../core'
import IconInput from './InputField'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripePayment from './StripePayment'
import { getStripePackagePrice } from '../core/utils'

const stripePromise = loadStripe("pk_live_GVS5gkERqxM2zrpUtORQZ8ia00ezUxKewe")

const CheckoutSummary = ({ visible, packageData, instaUserVerified, onPaymentSuccess }) =>
{
    const _STRIPE_ELEMENTS_OPTIONS = {
        mode     : 'subscription',
        amount   : getStripePackagePrice(packageData),
        currency : 'usd',
        setup_future_usage: 'off_session',

        appearance: {
            theme: 'flat',

            variables: {
                colorPrimary: '#0570de',
                colorBackground: '#525252',
                colorText: '#fff',
                colorDanger: '#df1b41',
                fontFamily: '"IBM Plex Sans", sans-serif',
                spacingUnit: '0.15em',
                borderRadius: '0.5em',
                // See all possible variables below
            }
        }
    }

    return(
        <div className='CheckoutSummary-module'
            style={{display: visible ? 'block' : 'none'}}>
            <div className='CheckoutSummary-module--title'>Order Summary</div>

            <div className='CheckoutSummary-module--instaData'
                style={{display: Data.Checkout.InstaUserdata ? 'block' : 'none'}}>
                <span className='bold'>@{ Data.Checkout.instaUsername }</span> will gain <span className='bold'>{ packageData.followers }</span> followers
            </div>
            <div className='CheckoutSummary-module--instaData'
                style={{display: Data.Checkout.InstaUserdata ? 'block' : 'none'}}>
                New follower count will be <span className='bold'>{ Data.Checkout.InstaUserdata ? Data.Checkout.InstaUserdata.followersCount + packageData.followers : 0 }</span> followers
            </div>

            <div className='divider' />
            
            <IconInput 
                title='Full Name *'
                placeholder='John Smith'
                oc={ (e) =>
                {
                    Data.Checkout.name = e.target.value
                } } />
            <IconInput 
                title='Email *'
                placeholder='me@example.com'
                oc={ (e) =>
                {
                    Data.Checkout.email = e.target.value
                } } />
            <IconInput 
                title='Phone Number'
                placeholder='(123) 456-7890'
                oc={ (e) =>
                {
                    Data.Checkout.phoneNumber = e.target.value
                } } />

            <div>
                { instaUserVerified && (
                    <Elements
                        options={ _STRIPE_ELEMENTS_OPTIONS }
                        stripe={ stripePromise }>
                        <StripePayment 
                            onPaymentSuccess={ onPaymentSuccess } 
                            packageData={ packageData } />
                    </Elements>
                ) }
            </div>
        </div>
    )
}

export default CheckoutSummary