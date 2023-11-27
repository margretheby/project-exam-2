import Nav from "../Nav/Nav";
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className="flex justify-between items-top mx-4 lg:max-w-[80%] lg:mx-auto">
            <div className="sm:order-2 sm:pt-2">
                <Nav />
            </div>
            <div className="mt-2 sm:order-1">
                <NavLink to='/' className="text-3xl text-[#EFEFEF] brand hover:text-[#FFEC58]">Holidaze</NavLink>
            </div>
            <div className="sm:hidden">
                <NavLink to='/profile' >
                    <img src='/icons/user.png' alt='User page' className="h-8 mt-2"/>
                </NavLink>
            </div>

        </div>
    );
}

export default Header;