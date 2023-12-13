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
           
          
            <Outlet></Outlet>
        </div>
    );
};

export default Home;