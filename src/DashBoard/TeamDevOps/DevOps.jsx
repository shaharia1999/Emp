import { Card } from "flowbite-react";
import NavBar from "../../NavBar";
const path  = location.pathname;



const DevOps = () => {
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
    
     
        <div className="px-20">
            <h1 className="text-center mt-5 font-semibold text-2xl bg-[#0891B2]  py-2 text-white">Team DevOps</h1>
            <div className="grid grid-cols-3 gap-5 mt-20 mb-6">
        <div className=" text-center shadow-lg px-5 rounded-lg">
          <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/ifty.png"
          />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">
          Team Leader
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
          Sarwar Alam
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>

        <div className=" text-center shadow-lg px-5 rounded-lg">
          <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/sha.png"
          />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">
          Front-End Developer
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
          MD Shaharia
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>

        <div className=" text-center shadow-lg px-5 rounded-lg">
          <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/pexels-chloe-1043474.png"
          />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">
          Back-End Developer
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
          Alex
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        </div>

            
        </div>
        </>
    );
};

export default DevOps;