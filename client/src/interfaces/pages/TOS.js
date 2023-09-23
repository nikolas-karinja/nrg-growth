import { useState } from 'react'
import { setPageTitle } from '../../core/utils'
import FooterSection from '../sections/FooterSection'
import TOSSection from '../sections/TOSSection'

const TOS = () =>
{
    const[isFirstLoad, setIsFirstLoad] = useState(true)

    if (isFirstLoad)
    {
        setPageTitle('Terms of Service')
        setIsFirstLoad(false)
    }

    return(
        <div className='Page-module'>
            <div className='Section-module'>
                <TOSSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default TOS