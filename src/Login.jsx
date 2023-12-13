import axios from "axios";
import { Button, Card } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import ApiUrl from "./ApiUrl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import './login.css'
import img from '../src/images/aws.png'
const Login = () => {
  const userAgent = navigator.userAgent;
  const browserName = navigator.appName;
  const browserVersion = navigator.appVersion;
useEffect(()=>{
   
//    console.log(localStorage.getItem('type')) 
   if(localStorage.getItem('type')){
 navigate("/dashboard/profile");
   }
},[]);
  console.log("User Agent:", userAgent);
  console.log("Browser Name:", browserName);
  console.log("Browser Version:", browserVersion);
  const navigate = useNavigate();
  function LoginUser(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let data = Object.fromEntries(formdata);

    axios
      .post(ApiUrl.LoginUrl, data, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        console.log(res);

        if (res?.data?.type && res.data) {
          localStorage.setItem("type", res.data?.type);
          localStorage.setItem("id", res.data.id);
          navigate("/dashboard/profile");
          location.reload();
        } else if (res.data) {
          localStorage.setItem("id", res.data.id);
          navigate("/dashboard/profile");
        }
        // if(localStorage.getItem('type')){

        // }
      })
      .catch((error) => {
        Swal.fire({
          title: error.response?.msg,
          text: error.response?.data?.msg,
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: true,
          showCancelButton: true,
        });
      });
  }
  return (
    <div className="relative">
    <div className="flex justify-center main">
     
    </div>
     <Card className="w-[30%] flex shadow-md bg-transparent justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  py-5">
      <div className="relative py-6">
      <img alt="awsPng" src={img} className="w-52 h-20 absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 "></img>
      </div>
     
        <form className="flex  flex-col gap-4 " onSubmit={LoginUser}>
          <div>
            <div className="mb-2 block">
              {/* <Label htmlFor="email1" value="Your email" /> */}
            </div>
            <TextInput
              id="email1"
              placeholder="Email"
              required
              type="email"
              name="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              {/* <Label htmlFor="password1" value="Your password" /> */}
            </div>
            <TextInput
              id="password1"
              placeholder="Password"
              required
              type="password"
              name="password"
            />
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="hover:bg-lime-600 bg-[#7271B6] py-2 rounded-lg text-white w-36"
          >
            Login
          </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
