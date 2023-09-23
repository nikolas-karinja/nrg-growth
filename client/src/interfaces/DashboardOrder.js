import { getLocaleString } from "../core/utils"
import DataBlock from "./DataBlock"

const DashboardOrder = ({ orderData }) =>
{
    let _OrderDate = new Date(orderData.date)
    let _orderMins = _OrderDate.getMinutes()

    return(
        <div className='DashboardList-module--order'>
            <div className='DashboardList-module--order--date'>
                { `${ _OrderDate.getMonth() + 1 }/${ _OrderDate.getDate() }/${ _OrderDate.getFullYear() }` }
            </div>
            <div className='DashboardList-module--order--price'>
                { `$${ orderData.totalPrice }` }
            </div>
            <div className='DashboardList-module--order--time'>
                { `${ (_OrderDate.getHours() + 11) % 12 + 1 }:${ _orderMins.toString().length > 1 ? _orderMins : `0${ _orderMins  }` } ${ _OrderDate.getHours() >= 12 ? 'PM' : 'AM' }` }
            </div>
            <DataBlock 
                name='Followers'
                data={ getLocaleString(orderData.followerCount) }
                valueColor='#ff00ff' />
            <DataBlock 
                name='Instagram Username'
                data={ `@${ orderData.instaUsername }` }
                valueColor='#00ffff' />
            <DataBlock 
                name='Follower Type'
                data={ orderData.femaleType ? 'Female' : 'Mixed' } />
            <DataBlock 
                name='Follower Location'
                data={ orderData.usaLocation ? 'USA' : 'Global' } />
        </div>
    )
}

export default DashboardOrder