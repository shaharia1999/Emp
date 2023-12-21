
import { AiFillAndroid } from "react-icons/ai";
import {BsCheckCircleFill  } from "react-icons/bs";
import { AiFillBuild } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { IoIosCloudDone } from "react-icons/io";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Status = () => {
  // Configuration options for the chart
  const options = {
    animationEnabled: true,
    title: {
      text: "Number of New Customers"
    },
    axisY: {
      title: "Number of Customers"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "spline",
      name: "2016",
      showInLegend: true,
      dataPoints: [
        { y: 155, label: "Jan" },
        { y: 150, label: "Feb" },
        { y: 152, label: "Mar" },
        { y: 148, label: "Apr" },
        { y: 142, label: "May" },
        { y: 150, label: "Jun" },
        { y: 146, label: "Jul" },
        { y: 149, label: "Aug" },
        { y: 153, label: "Sept" },
        { y: 158, label: "Oct" },
        { y: 154, label: "Nov" },
        { y: 150, label: "Dec" }
      ]
    },
    {
      type: "spline",
      name: "2017",
      showInLegend: true,
      dataPoints: [
        { y: 172, label: "Jan" },
        { y: 173, label: "Feb" },
        { y: 175, label: "Mar" },
        { y: 172, label: "Apr" },
        { y: 162, label: "May" },
        { y: 165, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 168, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 170, label: "Oct" },
        { y: 165, label: "Nov" },
        { y: 169, label: "Dec" }
      ]
    }]
  };
  return (
    <div className="px-32">
   
      <h1 className="text-center mt-4 bg-[#0891B2] text-white font-semibold py-2 ">
      Leave  Status
      </h1>
      <div className="flex justify-center items-center w-full shadow-lg px-20">
      <table className="w-full mt-9   ">
      <tbody className=" ">
        {/* <!-- row 1 --> */}
        <tr className="shadow-sm  table-row">
            <td className="p-2">
              <div className="flex items-center space-x-3 mt-3px-10">
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
        <tr className="shadow-sm " >
            <td className="p-2">
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
        <tr className="shadow-sm" >
            <td className="p-2">
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
    <div className="mt-10">
    <CanvasJSChart options={options} />
    </div>
    </div>
  );
};

export default Status;
