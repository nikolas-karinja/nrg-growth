import { useState } from 'react'
import '../../sass/modules.sass'
import IntroSection from '../sections/IntroSection'
import { setPageTitle } from '../../core/utils'
import LogoSection from '../sections/LogoSection'
import PackagesSection from '../sections/PackagesSection'
import FooterSection from '../sections/FooterSection'

const Home = () =>
{
    const[isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad)
    {
        setPageTitle('Home')
        setIsFirstLoad(false)
    }

    return(
        <div className='Page-module'>
            <div className='Section-module'>
                <LogoSection />
                <IntroSection />
                <PackagesSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default Home