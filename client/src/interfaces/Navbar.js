import '../sass/modules.sass'

import svg_logoUnmodified from '../img/logo-unmodified.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavbarLink from './NavbarLink'

const Navbar = () => 
{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const isWindowSmall = () =>
    {
        return windowWidth < 1080
    }

    useEffect(() =>
    {
        window.addEventListener('resize', () =>
        {
            setWindowWidth(window.innerWidth)
        })
    })

    return(
        <div className='Navbar-module'>
            <img className='Navbar-module--logo' 
                src={ svg_logoUnmodified }
                alt='Logo' />
            <Link className='logo'
                to='/'></Link>
            <div className='Navbar-module--name'
                style={{display: isWindowSmall() ? 'none' : 'block' }}>NRG Growth</div>
            <NavbarLink 
                hide={ isWindowSmall() }
                to='/'
                name='HOME' />
            <NavbarLink 
                hide={ isWindowSmall() }
                to='/packages'
                name='PACKAGES' />

            <Link className='Navbar-module--dashboard page' 
                to={ '/dashboard' }>DASHBOARD</Link>
        </div>
    )
}

export default Navbar