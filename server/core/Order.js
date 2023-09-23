export class Order
{
    constructor (data, followerCount)
    {
        this.totalPrice    = data.totalPrice
        this.followerCount = followerCount
        this.date          = data.date
        this.email         = data.email
        this.instaUsername = data.instaUsername
        this.femaleType    = data.femaleType
        this.usaLocation   = data.usaLocation
    }
}