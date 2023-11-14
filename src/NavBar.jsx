import { Navbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';



const NavBar = () => {
    const [type,setType]=useState(false)
    const [type2,setType2]=useState(false)
    const id=localStorage.getItem('id')
    let data= localStorage.getItem('type')
    // console.log(id);
    const myArray = [data];
    const isElementIncluded = myArray.includes('Front-end Developer','Back-end Developer','Front Desk Executive');
    
    console.log(isElementIncluded); // This will output true
 
    useEffect(()=>{
      
        let data= localStorage.getItem('type');
           if(data==='Admin'){
            setType(true)
           }else if
           (isElementIncluded){
            setType2(true)
           }
          
 
    },[type])

    return (
        <Navbar fluid rounded className='bg-[#0891B2] mb-4'>
            <Navbar.Brand href="/">
                <img src="https://arenawebsecurity.net/static/media/main-log-new.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className=" whitespace-nowrap text-xl font-semibold  text-white">EmpPanel</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {/* <NavLink to="/" className='text-white'>Home</NavLink>  */}
                <NavLink to="/profile" className='text-white'>Profile</NavLink>
        {
            !id && <NavLink to="/login" className='text-white'>Login</NavLink>
        }
                
                {
                    type &&  <NavLink to="/invoice" className='text-white'>Invoice</NavLink>
                }
                
                    
                
                {
                    type &&  <NavLink to="/leave" className='text-white'>Leave</NavLink> 
                }
                
                {
                    type || type2 && <NavLink to="/student" className='text-white'>Student</NavLink> 
                }
                
    
                
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;