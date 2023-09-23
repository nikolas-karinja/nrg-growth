import { Link } from 'react-router-dom'

const NavbarLink = ({ to, name, hide }) =>
{
    return <Link 
        className='page'
        style={ hide ? {display: 'none'} : {} }
        to={ to }>{ name }</Link>
}

export default NavbarLink