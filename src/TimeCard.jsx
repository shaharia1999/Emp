import moment from 'moment';
import { Card } from 'flowbite-react';
import { TbClockUp, TbClockDown } from "react-icons/tb";
import { useEffect, useState } from 'react';
import DurationCard from './DurationCard';

const TimeCard = ({ clock, ClockIn, ClockOut }) => {
    // console.log(clock);
    const [now, setNow] = useState(moment())
    useEffect(() => {
        const interval = setInterval(() => { setNow(moment()) }, 1000)
        return () => { clearInterval(interval) }
    }, [])

    return (
        <div className='flex-1'>
           
            <Card className='cursor-pointer' >
            <span className={` text-2xl text-center ${clock? 'text-red-600':'text-green-600'}`}>{`${clock?"Press The Card to Clock Out":"Press the Card to Clock In"}`}</span>
                <div className='flex flex-col justify-center items-center gap-5' onClick={() => { clock ? ClockOut() : ClockIn() }}>
                    <p>{now.format('dddd, MMMM Do YYYY')}</p>
                    {
                        clock ? <TbClockDown className='text-4xl text-red-500 '></TbClockDown> : <TbClockUp className='text-4xl text-green-500'></TbClockUp>
                    }
                    {/* <p>{now.format('h:mm:ss a')}</p> */}
                </div>
                {clock != false ? (
          <DurationCard clock={clock}></DurationCard>
        ) : (
          ""
        )}
            </Card>
        </div>
    );
};

export default TimeCard;