import { NavLink } from 'react-router-dom'
import logOut from '../../functions/logOut/logOut';
import { accessToken } from '../../variables/localStorage';


function Footer() {
    return (
        <div className='mx-auto text-center text-[#FFEC58] max-w-sm pb-10'>
            <ul className='flex justify-between'>
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
            <div className='pt-10 text-white'>
                <p>Holidaze</p>
                <p>&copy; 2023</p>
            </div>
        </div>
    );
}

export default Footer;