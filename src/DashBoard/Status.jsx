
import { AiFillAndroid } from "react-icons/ai";
import {BsCheckCircleFill  } from "react-icons/bs";
import { AiFillBuild } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { IoIosCloudDone } from "react-icons/io";

const Status = () => {
  // Configuration options for the chart
  return (
    <div>
      <h1 className="text-center text-2xl mt-2 font-bold">Leave  Status</h1>
      <div className="flex justify-center items-center w-full">
      <table className=" w-1/2 table-auto py-5 mt-10  ">
      <tbody>
        {/* <!-- row 1 --> */}
        <tr >
            <td>
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex h-12 w-12 items-center justify-center">
                  <div className="rounded-full border border-[#121d45] p-3">
                    {/* <AiFillBank  /> */}
                    <IoIosCloudDone className="text-[20px] text-green-500" />
                    {/* <AiFillAndroid className="text-[20px] text-yellow-500"/> */}
                  </div>
                </div>
                <div>
                  <div className="font-bold">Approved</div>
                  <div className="text-sm opacity-50">12 July 2023 -13 July 2023 (3 days)</div>
                </div>
              </div>
            </td>
            <td>
              <BsCheckCircleFill className="text-[20px] text-green-500" />
              {/* <AiFillBuild  className="text-[20px] text-yellow-400" /> */}
            </td>
          </tr>
        <tr >
            <td>
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex h-12 w-12 items-center justify-center">
                  <div className="rounded-full border border-[#121d45] p-3">
                    {/* <AiFillBank  /> */}
                    <AiFillAndroid className="text-[20px] text-yellow-400"/>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Pending</div>
                  <div className="text-sm opacity-50">12 July 2023 -13 July 2023 (3 days)</div>
                </div>
              </div>
            </td>
            <td>
              {/* <BsCheckCircleFill className="text-[20px] text-yellow-500" /> */}
              <AiFillBuild  className="text-[20px] text-yellow-400" />
            </td>
          </tr>
        <tr >
            <td>
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex h-12 w-12 items-center justify-center">
                  <div className="rounded-full border border-[#121d45] p-3">
                    {/* <AiFillBank  /> */}
                    {/* <AiFillAndroid className="text-[20px] text-yellow-500"/> */}
                    <RiSignalWifiErrorFill className="text-[20px] text-red-500" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Rejected</div>
                  <div className="text-sm opacity-50">12 July 2023 -13 July 2023 (3 days)</div>
                </div>
              </div>
            </td>
            <td>
              {/* <BsCheckCircleFill className="text-[20px] text-yellow-500" /> */}
              {/* <AiFillBuild  className="text-[20px] text-yellow-400" /> */}
              <MdErrorOutline className="text-[20px] text-red-400"/>
            </td>
          </tr>
       
      </tbody>
    
      
    </table>
    </div>
    </div>
  );
};

export default Status;
