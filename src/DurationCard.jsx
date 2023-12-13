import moment from "moment";
import { Card } from 'flowbite-react';
import { useEffect, useState } from "react";
const DurationCard = ({ clock }) => {
    console.log(clock);
    const [min,setMin]=useState(0)
    const [hour,sethour]=useState(0)
    const [sec,setSec]=useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
                setMin(getMinDiffrence());
                sethour(getHourDiffrence());
                setSec(getSecDiffrence());
        }, 1000)
        return () => { clearInterval(interval) }
    }, [clock])
    function getHourDiffrence() {
        let hour=moment.duration(moment().diff(moment(clock,'hh:mm'))).hours()
        return hour
    }
    function getMinDiffrence() {
        let min=moment.duration(moment().diff(moment(clock,'hh:mm'))).minutes()
        return min
    }
    function getSecDiffrence() {
        // Assuming `clock` is a string in the format 'hh:mm'
        let sec= moment.duration(moment().diff(moment(clock,'hh:mm'))).seconds()
         return sec;
       
      }
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <p>You Are Clocked In For</p>
                <p><span className="text-3xl font-black text-orange-400" id="hour">{hour}</span>h<span id="min" className="text-3xl font-black text-orange-500" >{min}</span>m<span id="sec" className="text-3xl font-black text-orange-500" >{sec}s</span></p>
            </div>

        </div>
    );
};

export default DurationCard;