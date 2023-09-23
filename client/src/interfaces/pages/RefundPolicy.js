import { useState } from 'react'
import { setPageTitle } from '../../core/utils'
import FooterSection from '../sections/FooterSection'
import RefundSection from '../sections/RefundSection'

const RefundPolicy = () =>
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
                <RefundSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default RefundPolicy