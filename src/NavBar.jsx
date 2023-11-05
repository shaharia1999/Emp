import { Navbar } from 'flowbite-react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { myContext } from './App';

const NavBar = () => {
    
    const {type} =useContext(myContext);
    return (
        <Navbar fluid rounded className='bg-[#0891B2] mb-4'>
            <Navbar.Brand href="/">
                <img src="https://arenawebsecurity.net/static/media/main-log-new.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className=" whitespace-nowrap text-xl font-semibold  text-white">EmpPanel</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <NavLink to="/" className='text-white'>Home</NavLink> 
                <NavLink to="/profile" className='text-white'>Profile</NavLink>
                <NavLink to="/login" className='text-white'>Login</NavLink>
                {
                    type&&<NavLink to="/invoice" className='text-white'>Invoice</NavLink>
                }
                
                <NavLink to="/leave" className='text-white'>Leave</NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;