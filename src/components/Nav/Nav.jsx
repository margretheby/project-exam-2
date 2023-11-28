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
            <div className='sm:hidden'>
                <button onClick={toggleMenu}>
                    <img src='/icons/menu.png' alt='Navigation' className='w-8 mt-2' />
                </button>
            </div>

            <ul className={`${
                isMenuOpen ? 'block' : 'hidden'
            } sm:flex gap-1 `}>
                <li className='m-2 hover:text-white hover:underline sm:border sm:rounded sm:px-4 sm:hover:text-[#FFEC58] sm:hover:no-underline sm:hover:border-[#FFEC58]'>
                    <NavLink to='/' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "underline text-[#FFEC58] sm:no-underline" : "",
                    ].join(" ") 
                    }>Home</NavLink>
                </li>
                {accessToken ? 
                <li className='m-2 hover:text-white hover:underline sm:border sm:rounded sm:px-4 sm:hover:text-[#FFEC58] sm:hover:no-underline sm:hover:border-[#FFEC58]'>
                    <NavLink to='/profile' className={({isActive, isPending}) => 
                        [
                            isPending ? "pending"  : "",
                            isActive ? "underline text-[#FFEC58] sm:no-underline " : "",
                        ].join(" ") 
                        } >Profile
                    </NavLink>
                </li> : ''}   
                <li className='m-2 hover:text-white hover:underline sm:border sm:rounded sm:px-4 sm:hover:text-[#FFEC58] sm:hover:no-underline sm:hover:border-[#FFEC58]'>
                    {accessToken ? <button onClick={logOut}>Logout</button> : <NavLink to='/login' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "underline text-[#FFEC58] ] sm:no-underline" : "",
                    ].join(" ") 
                    }>Login</NavLink>}
                </li>
            </ul>
        </div>
    )
}

export default Nav;
