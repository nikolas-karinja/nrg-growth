import svg_logoUnmodified from '../../img/logo-unmodified.svg'

const LogoSection = () =>
{
    return(
        <div className='Logo-section'>
            <div className='Section-module--content'>
                <img className='Logo-section--logo'
                    src={ svg_logoUnmodified }
                    alt='Logo' />
                <div className='Logo-section--title'>NRG GROWTH</div>
                <div className='Logo-section--subtitle'>GROWTH SERVICE SINCE 2014</div>
            </div>
        </div>
    )
}

export default LogoSection