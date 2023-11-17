import { NavLink, Outlet,} from "react-router-dom";



const DashBoard = () => {
    
    return (
        <div className='mt-[-20px] flex'>
            <aside className="bg-[#0891B2] px-20 w-96 h-[100vh]">
                <ul className="text-white  pt-16">
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"> <NavLink to='home'>Home</NavLink></li>
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='leave'>Apply Leave</NavLink></li>
                    <li className="mt-5 text-lg cursor-pointer hover:text-amber-400"><NavLink to='status'>Status</NavLink></li>
                </ul>
            </aside>
            <div className=""> 
            { <Outlet />}
            </div>
           
            
        </div>
    );
};

export default DashBoard;