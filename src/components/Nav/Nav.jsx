import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import logOut from '../../functions/logOut/logOut';
import { accessToken } from '../../variables/localStorage';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='text-[#FFEC58] sm:text-white'>
            <button onClick={toggleMenu}>
                <img src='/icons/menu.png' alt='Navigation' className='w-8 mt-2' />
            </button>
            <ul className={`${
                isMenuOpen ? 'block' : 'hidden'
            }`}>
                <li className='m-2'>
                    <NavLink to='/' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "underline" : "",
                    ].join(" ") 
                    }>Home</NavLink>
                </li>
                <li className='m-2'>
                    {accessToken ? <NavLink to='/profile' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "underline" : "",
                    ].join(" ") 
                    } >Profile</NavLink> : ''}   
                </li>
                <li className='m-2'>
                    {accessToken ? <button onClick={logOut}>Logout</button> : <NavLink to='/login' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "underline" : "",
                    ].join(" ") 
                    }>Login</NavLink>}
                </li>
            </ul>
        </div>
    )
}

export default Nav;
