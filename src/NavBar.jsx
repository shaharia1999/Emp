import { Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { True } from "./store/DrawarStore";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);
  const id = localStorage.getItem("id");
  let data = localStorage.getItem("type");
  // console.log(id);
  const myArray = [
    "Back-end Developer",
    "Front-end Developer",
    "Front Desk Executive",
    "Admin",
  ];
  const isElementIncluded = myArray.includes(data);

  // console.log(isElementIncluded); // This will output true

  useEffect(() => {
    // console.log(type,type2);

    let data = localStorage.getItem("type");
    if (data === "Admin") {
      setType(true);
    } else if (isElementIncluded) {
      setType2(true);
    }
  }, [type, type2]);
  function Logout() {
    localStorage.clear();
    setType(null)
    navigate("/login");
    location.reload()
  }

  return (
    <Navbar fluid rounded className="bg-[#0891B2] mb-4 z-[10] sticky">
      <Navbar.Brand href="/dashboard">
        <img
          src="https://arenawebsecurity.net/static/media/main-log-new.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className=" whitespace-nowrap text-xl font-semibold  text-white">
          EmpPanel
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* <NavLink to="/" className='text-white'>Home</NavLink>  */}
        {/* <NavLink to="/profile" className='text-white'>Profile</NavLink> */}
        {!id && (
          <NavLink to="/login" className="text-white">
            Login
          </NavLink>
        )}
        {id && (
          <li className="text-white cursor-pointer" onClick={Logout}>
            Log out
          </li>
        )}

        {type && (
          <NavLink to="/invoice" className="text-white">
            Invoice
          </NavLink>
        )}

        {/* {
                    type &&  <NavLink to="/leave" className='text-white'>Leave</NavLink> 
                } */}

        {type && (
          <NavLink to="/student" className="text-white">
            Student
          </NavLink>
        )}
        {type && (
          <NavLink to="/cer" className="text-white">
            Certificate
          </NavLink>
        )}
        {type2 && (
          <NavLink to="/student" className="text-white">
            Student
          </NavLink>
        )}

        <NavLink
          to="/dashboard"
          className="text-white"
          onClick={() => dispatch(True())}
        >
          DashBord
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
