import { useState } from 'react'
import { setPageTitle } from '../../core/utils'
import PackagesSection from '../sections/PackagesSection'
import FooterSection from '../sections/FooterSection'

const Packages = () =>
{
    const[isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad)
    {
        setPageTitle('Packages')
        setIsFirstLoad(false)
    }

    return(
        <div className='Page-module'>
            <div className='Section-module'>
                <PackagesSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default Packages