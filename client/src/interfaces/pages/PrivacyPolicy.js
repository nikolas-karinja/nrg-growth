import { useState } from 'react'
import { setPageTitle } from '../../core/utils'
import FooterSection from '../sections/FooterSection'
import PrivacySection from '../sections/PrivacySection'

const PrivacyPolicy = () =>
{
    const[isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad)
    {
        setPageTitle('Privacy Policy')
        setIsFirstLoad(false)
    }

    return(
        <div className='Page-module'>
            <div className='Section-module'>
                <PrivacySection />
                <FooterSection />
            </div>
        </div>
    )
}

export default PrivacyPolicy