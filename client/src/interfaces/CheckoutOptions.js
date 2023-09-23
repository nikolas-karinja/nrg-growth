import '../sass/modules.sass'

const CheckoutOptions = ({ visible, packageData, type1, type2, price, img1, img2, c1, c2 }) =>
{
    return(
        <div className='CheckoutOptions-module Clickable-module--root' 
            style={{display: visible ? 'block' : 'none'}}>
            <div className='CheckoutOptions-module--option'
                onClick={ c1 }>
                <img className='CheckoutOptions-module--option--img'
                    src={ img1 }
                    alt='img1' />
                <div className='CheckoutOptions-module--option--type'>
                    <span className='bold'>{ type1 }</span><br />Followers
                </div>
                <div className='CheckoutOptions-module--option--price'>
                    + Add <span className='bold'>${ price }</span>
                </div>
            </div>

            <div className='CheckoutOptions-module--option'
                onClick={ c2 }>
                <img className='CheckoutOptions-module--option--img'
                    src={ img2 }
                    alt='img2' />
                <div className='CheckoutOptions-module--option--type'>
                    <span className='bold'>{ type2 }</span> Followers
                </div>
            </div>
        </div>
    )
}

export default CheckoutOptions