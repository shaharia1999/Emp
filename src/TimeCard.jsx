import moment from 'moment'
import { Card } from 'flowbite-react';
import { TbClockUp, TbClockDown } from "react-icons/tb";
import { useEffect, useState } from 'react';
const TimeCard = ({ clock, ClockIn, ClockOut }) => {
    const [now, setNow] = useState(moment())
    useEffect(() => {
        const interval = setInterval(() => { setNow(moment()) }, 1000)
        return () => { clearInterval(interval) }
    }, [])

    return (
        <div>
            <span className='text-red-600 text-sm'>*press the card to clock in and out</span>
            <Card >
                <div className='flex flex-col justify-center items-center gap-5' onClick={() => { clock ? ClockOut() : ClockIn() }}>
                    <p>{now.format('dddd, MMMM Do YYYY')}</p>
                    {
                        clock ? <TbClockDown className='text-4xl '></TbClockDown> : <TbClockUp className='text-4xl '></TbClockUp>
                    }
                    <p>{now.format('h:mm:ss a')}</p>
                </div>
            </Card>
        </div>
    );
};

export default TimeCard;