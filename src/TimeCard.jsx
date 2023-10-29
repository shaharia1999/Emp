import moment from 'moment'
import { Card } from 'flowbite-react';
import { IoHandRightOutline } from "react-icons/io5";
import { useState } from 'react';
const TimeCard = () => {
    const [now, setNow] = useState(moment())
    setInterval(() => { setNow(moment()) }, 1000)
    return (
        <Card >
        <div className='flex flex-col justify-center items-center gap-5'>
            {now.format('dddd')}
            <IoHandRightOutline className='text-2xl '></IoHandRightOutline>
            {now.format('MMMM Do YYYY, h:mm:ss a')}
        </div>
    </Card>
    );
};

export default TimeCard;