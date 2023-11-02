import { Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <img src="https://arenawebsecurity.net/static/media/main-log-new.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">EmpPanel</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <NavLink to="/">Home</NavLink> 
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/invoice">Invoice</NavLink>
                <NavLink to="/leave">Leave</NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;