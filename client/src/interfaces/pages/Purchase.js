import svg_female from '../../img/icons/female.svg'
import svg_mixed from '../../img/icons/mixed.svg'
import svg_usa from '../../img/icons/usa.svg'
import svg_globe from '../../img/icons/globe.svg'

import { useEffect, useState } from 'react'
import { getPackageData, setPageTitle } from '../../core/utils'
import Loading from '../Loading'
import CheckoutOptions from '../CheckoutOptions'
import { Data } from '../../core'
import CheckoutVerification from '../CheckoutVerification'
import CheckoutSummary from '../CheckoutSummary'
import PaymentSuccessful from '../PaymentComplete'
import PaymentComplete from '../PaymentComplete'
import FooterSection from '../sections/FooterSection'

const Purchase = ({ packageName }) =>
{
    const [isFirstLoad, setIsFirstLoad]      = useState(true)
    const [packageData, setPackageData]      = useState(null)
    const [followerTypeSelected, setFTS]     = useState(false)
    const [followerLocationSelected, setFLS] = useState(false)
    const [instaUserVerified, setIUV]        = useState(false)
    const [paymentPassed, setPP]             = useState(false)

    const loadPackageData = async () =>
    {
        setPackageData(await getPackageData(packageName))
    }

    if (isFirstLoad)
    {
        setPageTitle('Purchase')
        setIsFirstLoad(false)
        loadPackageData()
    }

    if (!packageData)
    {
        return(
            <div className='Page-module'>
                <Loading message='Loading package...' />
            </div>
        )
    }
    else
    {
        return(
            <div className='Page-module'>
                <div className='Section-module--content'>
                <div className='Checkout-module--title'>{ paymentPassed ? 'Congratulations!' : 'NRG Growth Checkout' }</div>
                <div className='Checkout-module--message'>
                    You { paymentPassed ? 'have purchased' : 'are purchasing' } <span className='bold'>{ packageData.followers } Instagram Followers</span>
                </div>
                    <CheckoutOptions
                        visible={ !followerTypeSelected && !instaUserVerified && !paymentPassed }
                        packageData={ packageData }
                        type1='Female'
                        type2='Mixed'
                        price={ packageData.femalePrice[0] }
                        img1={ svg_female }
                        img2={ svg_mixed }
                        c1={ () =>{
                            Data.Checkout.followerType = 'Female'

                            setFTS(true)
                        } }
                        c2={ () =>{
                            Data.Checkout.followerType = 'Mixed'

                            setFTS(true)
                        } } />

                    <CheckoutOptions
                        visible={ followerTypeSelected && !followerLocationSelected && !instaUserVerified && !paymentPassed }
                        packageData={ packageData }
                        type1='United States'
                        type2='Global'
                        price={ packageData.usaPrice[0] }
                        img1={ svg_usa }
                        img2={ svg_globe }
                        c1={ () =>{
                            Data.Checkout.followerLocation = 'USA'

                            setFLS(true)
                        } }
                        c2={ () =>{
                            Data.Checkout.followerLocation = 'Global'

                            setFLS(true)
                        } } />
                    <CheckoutVerification
                        visible={ followerTypeSelected && followerLocationSelected && !instaUserVerified && !paymentPassed }
                        onVerification={ () =>
                        {
                            setIUV(true)
                        } } />
                    <CheckoutSummary
                        visible={ instaUserVerified && !paymentPassed }
                        packageData={ packageData }
                        instaUserVerified={ instaUserVerified }
                        onPaymentSuccess={ () =>
                        {
                            setPP(true)
                        } } />

                    <PaymentComplete
                        visible={ instaUserVerified && paymentPassed } />
                </div>
                <FooterSection />
            </div>
        )
    }
}

export default Purchase