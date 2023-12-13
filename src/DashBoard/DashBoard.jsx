import { NavLink, Outlet } from "react-router-dom";
import { Drawer } from "react-rainbow-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { False } from "../store/DrawarStore";
import NavBar from "../NavBar";
let data = localStorage.getItem("type");

const DashBoard = () => {
  const drawar = useSelector((state) => state.drawar.value);
  const dispatch = useDispatch();
  console.log(drawar);
  console.log(data);
  const path  = location.pathname;
  console.log(path);

  useEffect(()=>{

  },[drawar])
  // const [isOpen,setIsOpen]=useState(true)

  return (
    <>
       {
                path=='/student/1'?<></>:<div>
                              <marquee>
            <addr className="font-bold">Notice : </addr>
            Arrive promptly at 10:10 a.m. and depart at 6:00 p.m. Any arrival
            after 10:10 a.m. is considered late.
            <span className="text-red-500">
              {" "}
              Three instances of tardiness will result in a deduction of one
              day's salary..
            </span>
          </marquee>
                    <NavBar></NavBar>
                </div>
            }

    <div className="mt-[-20px] flex ">
      <Drawer
        id="drawar-1"
        // header="This is a drawer"
        isOpen={drawar}
        onRequestClose={() => dispatch(False())}
      >
        <aside
          className="bg-[#3ca5c0] px-20  h-full w-full shadow-2xl"
          id="drawar-1"
        >
          <ul className="  pt-16 text-white">
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
              {" "}
              <NavLink to="" onClick={() => dispatch(False())}>
                Home
              </NavLink>
            </li>
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
              <NavLink to="profile" onClick={() => dispatch(False())}>
                Profile
              </NavLink>
            </li>
            <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
              <NavLink to="team" onClick={() => dispatch(False())}>
                Team
              </NavLink>
            </li>

            {data === "Admin" ? (
              <>
                {" "}
                <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
                  <NavLink to="leaveapp" onClick={() => dispatch(False())}>
                    Leave Applicants
                  </NavLink>
                </li>
                <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
                  <NavLink to="taskList" onClick={() => dispatch(False())}>
                    Task List{" "}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
               <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
                  <NavLink to="task" onClick={() => dispatch(False())}>
                    Task{" "}
                  </NavLink>
                </li>
                <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
                  <NavLink to="leave" onClick={() => dispatch(False())}>
                    Apply Leave
                  </NavLink>
                </li>
                <li className="mt-5 text-lg cursor-pointer hover:text-amber-400">
                  <NavLink to="status" onClick={() => dispatch(False())}>
                    Leave Status
                  </NavLink>
                </li>
               
              </>
            )}
          </ul>
        </aside>
      </Drawer>
      <div className="felx justify-center w-full h-[95vh] overflow-y-scroll">
        {<Outlet />}
      </div>
    </div>
    </>
  );
};

export default DashBoard;
