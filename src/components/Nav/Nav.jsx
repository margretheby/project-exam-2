import { Link } from 'react-router-dom'
import logOut from '../../functions/logOut/logout';
import { accessToken } from '../../variables/localStorage';

function Nav() {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    {accessToken ? <Link to='/profile'>Profile</Link> : ''}   
                </li>
                <li>
                    {accessToken ? <button onClick={logOut}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
            </ul>
        </div>
    )
}

export default Nav;
