import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const path  = location.pathname;
    console.log(path);
    const drawar = useSelector((state) =>(state.drawar.value))
    const dispatch = useDispatch()
    useEffect(()=>{

    },[drawar])
    return (
        <div >
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
          
            <Outlet></Outlet>
        </div>
    );
};

export default Home;