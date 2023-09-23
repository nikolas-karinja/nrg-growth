import * as Packages from './packages.js'

export const getUnixTimestamp = (daysToAdd = 0) =>
{
    const _DATE = new Date()
    
    return _DATE.setDate(_DATE.getDate() + daysToAdd)
}

export const getPackageData = (name) =>
{
    return new Promise((resolve) =>
    {
        let _Data = null

        for (let p of Packages.list)
        {
            if (p.name === name)
            {
                _Data = p

                break
            }
        }

        resolve(_Data)
    })
}

export const getPackagePrice = (stripe = false, packageData, femaleType, usaLocation) =>
{
    let _s = `${ (packageData.discountPrice[0] 
        + packageData.processingFee[0]
        + (femaleType ? packageData.femalePrice[0] : 0)
        + (usaLocation ? packageData.usaPrice[0] : 0)).toFixed(2) }`
    
    if (stripe)
    {
        _s = _s.replace('.', '')
    }

    return Number(_s)
}

