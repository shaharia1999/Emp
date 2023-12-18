import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();
  function Nav(nav) {
    navigate(nav);
    location.reload()
  }
  return (
    <div className="px-20 mb-10">
      <h1 className="text-center mt-4 bg-[#0891B2] text-white font-semibold py-2 ">
        Team AWS
      </h1>
      <div className="grid grid-cols-3 gap-5 mt-20 mb-6">
        <div className=" text-center shadow-lg rounded-lg">
          <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/ceo.png"
          />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">
            Ceo
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
            Tanjim AL Fahim
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div className="cursor-pointer text-center shadow-lg rounded-lg" onClick={()=>Nav('/team/delta')}>
        <div className="flex justify-center  ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/nira.png"
          />
          </div>
         
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10">
            Team Delta
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
            Anika Tabassum Nira
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20 ">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div className="cursor-pointer text-center shadow-lg rounded-lg" onClick={()=>Nav('/team/devOps')}>
        <div className="flex justify-center ">
          <img
            className="w-64 h-64 rounded-full border border-yellow-300 mt-[-40px]"
            alt="Meaningful alt text for an image that is not purely decorative"
            src="../../src/images/ifty.png"
          />
          </div>
     
          <h5 className="text-2xl mt-10 font-bold tracking-tight text-gray-900 dark:text-white">
            Arena DevOps
          </h5>
          <h5 className="text-1xl font-semibold tracking-tight text-green-500 py-2">
            Sarwar Alam
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-20 ">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
       
      </div>
    </div>
  );
};

export default Team;
