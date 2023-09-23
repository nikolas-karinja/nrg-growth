import { Data } from "."

export const getPackageData = (packageName) =>
{
    return new Promise((resolve) =>
    {
        fetch('/pi', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageName }),
        })
            .then((res) => res.json())
            .then((data) => resolve(data.data))
    })
}

export const getUserdata = (username) =>
{
    return new Promise((resolve) =>
    {
        fetch('/siu', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        })
            .then((res) => res.json())
            .then((data) => resolve(data.userdata))
    })
}

export const getStripePackagePrice = (packageData) =>
{
    let _s = `${ (packageData.discountPrice[0] 
        + packageData.processingFee[0]
        + (Data.Checkout.followerType === 'Female' ? packageData.femalePrice[0] : 0)
        + (Data.Checkout.followerLocation === 'USA' ? packageData.usaPrice[0] : 0)).toFixed(2) }`
    
    _s = _s.replace('.', '')

    return Number(_s)
}

export const validateEmail = (email) => 
{
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

export const getLocaleString = (string) =>
{
    return string.toLocaleString('en-US')
}

export const getUnixTimestamp = (daysToAdd = 0) =>
{
    const _DATE = new Date()
    
    return _DATE.setDate(_DATE.getDate() + daysToAdd)
}

export const setPageTitle = (value) =>
{
    document.head.querySelector('title').innerHTML = `NRG Growth - ${ value }`
}