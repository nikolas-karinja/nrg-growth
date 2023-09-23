import { Link } from "react-router-dom"

const FooterSection = () =>
{
    return(
        <div className='Footer-section'>
            <div className='Section-module--content'>
                <div className='Footer-section--message'>
                    © Copyright 2023 NRG Growth LLC. All Rights Reserved.
                </div>
                <div className='Footer-section--message'>
                    nrg-growth.com is not affiliated with Instagram TM, Facebook Inc. in any way.
                </div>
                <div className='Footer-section--message'>
                    30 N Gould St Ste R Sheridan, WY 82801 USA
                </div>
                <div className='Footer-section--buttons'>
                    <Link to='/tos'>Terms of Service</Link>
                    <Link to='/privacy'>Privacy Policy</Link>
                    <Link to='/refund'>Refund Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default FooterSection