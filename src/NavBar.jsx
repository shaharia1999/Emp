import { Navbar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';



const NavBar = () => {
    const [type,setType]=useState(false)
    const [type2,setType2]=useState(false)
    const id=localStorage.getItem('id')
    let data= localStorage.getItem('type')
    // console.log(id);
    const myArray = ['Back-end Developer','Front-end Developer','Front Desk Executive'];
    const isElementIncluded = myArray.includes(data);
    
    console.log(isElementIncluded); // This will output true
 
    useEffect(()=>{
        console.log(type,type2);
      
        let data= localStorage.getItem('type');
           if(data==='Admin'){
            setType(true)
           }else if
           (isElementIncluded){
            setType2(true)
           }
    },[type,type2])

    return (
        <Navbar fluid rounded className='bg-[#0891B2] mb-4 z-[10] sticky'>
            <Navbar.Brand href="/">
                <img src="https://arenawebsecurity.net/static/media/main-log-new.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                <span className=" whitespace-nowrap text-xl font-semibold  text-white">EmpPanel</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {/* <NavLink to="/" className='text-white'>Home</NavLink>  */}
                {/* <NavLink to="/profile" className='text-white'>Profile</NavLink> */}
        {
            !id && <NavLink to="/login" className='text-white'>Login</NavLink>
        }
                
                {
                    type &&  <NavLink to="/invoice" className='text-white'>Invoice</NavLink>
                }
                
                    
                
                {/* {
                    type &&  <NavLink to="/leave" className='text-white'>Leave</NavLink> 
                } */}
                
                {
                    type  && <NavLink to="/student" className='text-white'>Student</NavLink> 
                }
                {
                   type2 && <NavLink to="/student" className='text-white'>Student</NavLink> 
                }
                {
                    type &&  <NavLink to="/dashboard" className='text-white'>DashBord</NavLink> 
                }
                   
                

                
    
                
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;