import { Link, NavLink } from 'react-router-dom'
import logOut from '../../functions/logOut/logout';
import { accessToken } from '../../variables/localStorage';

function Nav() {
    return (
        <div>
            <ul>
                <li>
                    <NavLink to='/' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "bg-gray-200" : "",
                    ].join(" ") 
                    }>Home</NavLink>
                </li>
                <li>
                    {accessToken ? <NavLink to='/profile' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "bg-gray-200" : "",
                    ].join(" ") 
                    } >Profile</NavLink> : ''}   
                </li>
                <li>
                    {accessToken ? <button onClick={logOut}>Logout</button> : <NavLink to='/login' className={({isActive, isPending}) => 
                    [
                        isPending ? "pending"  : "",
                        isActive ? "bg-gray-200" : "",
                    ].join(" ") 
                    }>Login</NavLink>}
                </li>
            </ul>
        </div>
    )
}

export default Nav;
