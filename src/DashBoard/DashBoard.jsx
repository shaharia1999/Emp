
import { NavLink, Outlet,} from "react-router-dom";

const DashBoard = () => {
    return (
        <div className='mt-[-20px] flex '>
            <aside className="bg-[#3ca5c0] px-20  h-[100vh] w-1/5 shadow-2xl">
                <ul className="  pt-16 text-white">
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"> <NavLink to=''>Home</NavLink></li>
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='profile'>Profile</NavLink></li>
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='leave'>Apply Leave</NavLink></li>
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='status'>Status</NavLink></li>
                    
                </ul>
            </aside>
            <div className="felx justify-center  w-4/5 h-[95vh] overflow-y-scroll"> 
          
            
            { <Outlet />}
            </div>
           
            
        </div>
    );
};

export default DashBoard;