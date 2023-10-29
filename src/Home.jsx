import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
    return (
        <div >
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;