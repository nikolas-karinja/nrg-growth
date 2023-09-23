import '../sass/modules.sass'

import gif_loading from '../img/loading.gif'

import svg_at from '../img/icons/at.svg'
import svg_check from '../img/icons/check.svg'

import { Data } from '../core'
import IconInput from './InputField'
import { useState } from 'react'
import { getUserdata } from '../core/utils'

const CheckoutVerification = ({ visible, onVerification }) =>
{
    const [state, setState] = useState(Date.now())

    return(
        <div className='CheckoutVerification-module'
            style={{display: visible ? 'block' : 'none'}}>
            <div className='CheckoutVerification-module--title'>User Verification</div>
            <div className='CheckoutVerification-module--desc'>
                { Data.Checkout.waitingForVerification ? `Verifying your account...` : Data.Checkout.firstUserVerification ? `We want to make sure your followers get to the right account. Enter your instragram username then click the button below to verify it.` :
                !Data.Checkout.InstaUserdata ? `Your username you entered is not valid.` : 
                Data.Checkout.InstaUserdata.private ? `The account entered is private. Please make sure your account is public and try again.` : `Your account has been verified.` }
            </div>
            
            <IconInput 
                title='Instagram Username'
                placeholder=''
                oc={ (e) =>
                {
                    Data.Checkout.instaUsername = e.target.value
                } } />

            <img className='notifier'
                style={{display: Data.Checkout.waitingForVerification ? 'block' : 'none'}}
                src={ gif_loading }
                alt='Instagram Data Loading...' />

            <img className='notifier'
                style={{display: !Data.Checkout.waitingForVerification && !Data.Checkout.firstUserVerification && Data.Checkout.InstaUserdata && !Data.Checkout.InstaUserdata.private ? 'block' : 'none'}}
                src={ svg_check }
                alt='Check' />

            {/* <div className='CheckoutVerification-module--instaData'
                style={{display: !Data.Checkout.waitingForVerification && Data.Checkout.InstaUserdata ? 'block' : 'none'}}>
                <span className='bold'>@{ Data.Checkout.instaUsername }</span> will gain <span className='bold'>{ packageData.followers }</span> followers
            </div>
            <div className='CheckoutVerification-module--instaData'
                style={{display: !Data.Checkout.waitingForVerification && Data.Checkout.InstaUserdata ? 'block' : 'none'}}>
                New follower count will be <span className='bold'>{ Data.Checkout.InstaUserdata ? Data.Checkout.InstaUserdata.followersCount + packageData.followers : 0 }</span> followers
            </div> */}

            <div className='CheckoutVerification-module--verify Clickable-module--root'
                style={{display: !Data.Checkout.waitingForVerification || (!Data.Checkout.waitingForVerification && !Data.Checkout.InstaUserdata) || (Data.Checkout.InstaUserdata && Data.Checkout.InstaUserdata.private) ? 'block' : 'none'}}
                onClick={ () =>
                {
                    Data.Checkout.waitingForVerification = true

                    setTimeout(async () =>
                    {
                        Data.Checkout.InstaUserdata = await getUserdata(Data.Checkout.instaUsername)
                    
                        if (Data.Checkout.firstUserVerification)
                        {
                            Data.Checkout.firstUserVerification = false
                        }

                        if (Data.Checkout.InstaUserdata)
                        {
                            if (!Data.Checkout.InstaUserdata.private)
                            {
                                setTimeout(onVerification, 1000)
                            }
                        }

                        Data.Checkout.waitingForVerification = false

                        setState(Date.now())
                    }, 100)

                    setState(Date.now())
                } }>
                Verify
            </div>
        </div>
    )
}

export default CheckoutVerification