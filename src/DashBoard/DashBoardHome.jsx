
import CanvasJSReact from '@canvasjs/react-charts';
import moment from "moment";
// import { NavLink, Outlet,} from "react-router-dom";
import { Select as FlowbiteSelect, TextInput,} from 'flowbite-react';
import { useState } from "react";
import { MdTask } from 'react-icons/md';




var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const DashBoardHome = () => {
  const months = new Array(12)
  const [month,setMonth]=useState('')
  const [year, setYear] = useState(moment().format("YYYY"))
  console.log(month);
  
  for (let index = 0; index < 12; index++) {
      let t = { 'label': moment().month(index).format('MMMM'), 'value': index + 1 }
      months.push(t)
  }
  // Configuration options for the chart

// Index Label Chart
const [options2, setOptions2] = useState({
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",

    axisY: {
      includeZero: true
    },
    height:700,
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 71 },
        { x: 60, y: 68 },
        { x: 70, y: 38 },
        { x: 80, y: 92,  },
        { x: 90, y: 54 },
        { x: 100, y: 60 },
        { x: 110, y: 21 },
        { x: 120, y: 49 },
        { x: 130, y: 36 }
      ]
    }]
  });
  const updateFirstDataPointY = (newY) => {
    alert('hi')
    // Create a copy of the options2 state
    const updatedOptions = { ...options2 };

    // Update the y value of the first data point
    updatedOptions.data[0].dataPoints[0].y = 25;

    // Update the state with the new options
    setOptions2(updatedOptions);
  };

console.log(options2.data[0].dataPoints[0].y);
// pie Chart 
const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"

    data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",		
        startAngle: -90,
        dataPoints: [
            { y: 20, label: "Airfare" },
            { y: 24, label: "Food & Drinks" },
            { y: 20, label: "Accomodation" },
            { y: 14, label: "Transportation" },
            { y: 12, label: "Activities" },
            { y: 10, label: "Misc" }	
        ]
    }]
}

  return (
    <div className='  px-10'>
        <h1 className="font-bold text-2xl text-center mt-10">Your History</h1>
      <div className="flex px-10 mt-2 justify-center">
    
                
                <FlowbiteSelect
                                        id="select"
                                        required
                                        className="w-1/3"
                                        onChange={value => setMonth(value.target.value)}
    
                                    >
                                        <option>Select Month</option>
                                        {
                                            months?.map((x, index) => {
                                                return (
                                                    <option key={index} value={x.value}>
                                                        {x.label}
                                                    </option>
                                                )
                                            })
                                        }
                                    </FlowbiteSelect>
                                    <TextInput
                                        id="year"
                                        placeholder="Year..."
                                        required
                                        defaultValue={year}
                                        maxLength={4}
                                        onChange={value => setYear(value.target.value)}
                                        type="number"
                                        className="ml-1 w-1/3"
                                        
                                    />
                                    </div>
    
      {/* <CanvasJSChart options={options} /> */}
      <div className='grid grid-cols-6 gap-5 my-10'>
      <div className='col-span-4 shadow-2xl px-10 py-10' >
        <div className=''>
        <CanvasJSChart options={options2}  />
        </div>
        
      </div>
      <div className='col-span-2 '>
        <div className=''>
            <div className='flex justify-between items-center shadow-lg  py-6 border px-5 my-2'>
                <div><MdTask className='text-3xl text-blue-500' /></div>
                <div>
                    <p>Total Task</p>
                    <p className='text-center text-2xl'>34 +</p>
                </div>
                <div className='text-center text-2xl'>10%</div>
            </div>
            <div className='flex justify-between items-center shadow-lg  py-6 border px-5 my-2'>
                <div><MdTask className='text-3xl text-red-500' /></div>
                <div>
                    <p>Total Task</p>
                    <p className='text-center text-2xl'>34 +</p>
                </div>
                <div className='text-center text-2xl'>10%</div>
            </div>
            <div className='flex justify-between items-center shadow-lg  py-6 border px-5 my-2'>
                <div><MdTask className='text-3xl text-green-500' /></div>
                <div>
                    <p>Total Task</p>
                    <p className='text-center text-2xl'>34 +</p>
                </div>
                <div className='text-center text-2xl'>10%</div>
            </div>
            <div className='flex justify-between items-center shadow-lg  py-6 border px-5 my-2'>
                <div><MdTask className='text-3xl text-yellow-500' /></div>
                <div>
                    <p>Total Task</p>
                    <p className='text-center text-2xl'>34 +</p>
                </div>
                <div className='text-center text-2xl'>10%</div>
            </div>
            
        </div>
        <div className='shadow-lg' >
        <CanvasJSChart options={options}   />
        {/* <button onClick={()=>updateFirstDataPointY()}>hi</button> */}
        </div>
      </div>
    </div>


     
    </div>
  );
};

export default DashBoardHome;
