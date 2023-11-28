
import { NavLink, Outlet,} from "react-router-dom";
import {  Drawer } from 'react-rainbow-components';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { False } from "../store/DrawarStore";

const DashBoard = () => {
    const drawar = useSelector((state) =>(state.drawar.value))
    const dispatch = useDispatch()
    console.log(drawar );
    // const [isOpen,setIsOpen]=useState(true)
    
    return (
        <div className='mt-[-20px] flex '>
            <Drawer
            id="drawar-1"
            // header="This is a drawer"
            isOpen={drawar}
            onRequestClose={() => dispatch(False())}
        ><aside className="bg-[#3ca5c0] px-20  h-full w-full shadow-2xl" id='drawar-1'>
        <ul className="  pt-16 text-white">
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"> <NavLink to=''onClick={() => dispatch(False())}>Home</NavLink></li>
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='profile'onClick={() => dispatch(False())}>Profile</NavLink></li>
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='leave'onClick={() => dispatch(False())}>Apply Leave</NavLink></li>
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='status'onClick={() => dispatch(False())}>Status</NavLink></li>
        </ul>
    </aside></Drawer>
            <div className="felx justify-center w-full h-[95vh] overflow-y-scroll"> 
          
            
            { <Outlet />}
            </div>
           
            
        </div>
    );
};

export default DashBoard;