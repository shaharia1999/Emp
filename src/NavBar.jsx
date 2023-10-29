import { Navbar } from 'flowbite-react';
const NavBar = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/">Home</Navbar.Link>
                <Navbar.Link href="/login">Login</Navbar.Link>
                <Navbar.Link href="/profile">Profile</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;