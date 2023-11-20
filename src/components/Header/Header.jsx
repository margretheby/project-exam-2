import Nav from "../Nav/Nav";
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className="flex justify-between items-top mx-4">
            <Nav />
            <div>
                <NavLink to='/' className="text-3xl mt-2 text-[#EFEFEF] brand">Holidaze</NavLink>
            </div>
            <NavLink to='/profile' >
                <img src='/icons/user.png' alt='User page' className="h-8 mt-2"/>
            </NavLink>
        </div>
    );
}

export default Header;