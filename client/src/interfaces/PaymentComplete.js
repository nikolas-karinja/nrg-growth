import svg_check from '../img/icons/check.svg'

const PaymentComplete = ({ visible }) => 
{
    return(
        <div style={{display: visible ? 'block' : 'none'}}>
            <div className='PaymentComplete-module'>
                <img className='PaymentComplete-module--img'
                    src={ svg_check }
                    alt='Check'/>
                <div>
                    Please allow about <span className='bold'>20 minutes</span> for your followers to start appearing on instagram.
                </div>
                <div>
                    You can also check the <span className='bold'>Dashboard</span> for the status and data associated with your order.
                </div>
            </div>
        </div>
    )
}

export default PaymentComplete