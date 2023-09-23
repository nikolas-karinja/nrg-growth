import { useState } from 'react'
import svg_box from '../../img/icons/box.svg'
import svg_diamond from '../../img/icons/diamond.svg'
import svg_match from '../../img/icons/match.svg'
import svg_trendup from '../../img/icons/trendup.svg'

import PackagesSectionCard from '../PackagesSectionCard'

const PackagesSection = () =>
{
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [packages, setPackages]       = useState([])

    const loadPackageData = async () =>
    {
        const _GetPackages = await fetch('/get-packages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const { list } = await _GetPackages.json()

        setPackages(list)
    }

    if (isFirstLoad)
    {
        setIsFirstLoad(false)
        loadPackageData()
    }

    return(
        <div className='Packages-section'>
            <div className='Section-module--content'>
                <div className='Packages-section--title'>What packages do we offer?</div>
                <div className='Packages-section--grid'>
                    { packages.length > 0 ? packages.map((p) => 
                    {
                        let _img = svg_box

                        switch (p.name)
                        {
                            case 'Starter':
                                _img = svg_match

                                break
                            case 'Premium':
                                _img = svg_diamond

                                break
                            case 'Popular':
                                _img = svg_trendup

                                break
                            default:
                                break
                        }

                        return <PackagesSectionCard
                            img={ _img }
                            packageData={ p } />
                    }) : <></> }
                </div>
            </div>
        </div>
    )
}

export default PackagesSection