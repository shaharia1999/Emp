
import CanvasJSReact from '@canvasjs/react-charts';
import moment from "moment";
import { NavLink, Outlet,} from "react-router-dom";
import { Select as FlowbiteSelect, TextInput, Modal, Button, Textarea } from 'flowbite-react';
import { useState } from "react";


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
  console.log(months);
  // Configuration options for the chart
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "", // "light1", "dark1", "dark2"
    title:{
        text: ""
    },
    height: 500,
    data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",		
        startAngle: -90,
        dataPoints: [
            { y: 20, label: "Attends" },
            { y: 24, label: "Absense" },
            { y: 20, label: "Late" },
            { y: 14, label: "Leave" },
          
        ]
    }]
}


  return (
    <div className='  px-10'>
        <h1 className="font-bold text-2xl text-center mt-2">Your History</h1>
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
    
      <CanvasJSChart options={options} />
     
    </div>
  );
};

export default DashBoardHome;
