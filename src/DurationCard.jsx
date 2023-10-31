import moment from "moment";
import { Card } from 'flowbite-react';
import { useEffect } from "react";
const DurationCard = ({ clock }) => {
    let hour = getHourDiffrence()
    let min = getMinDiffrence()
    // setHour(moment.duration(moment().diff(moment(clock))).hours());
    // setMin(moment.duration(moment().diff(moment(clock))).minutes());
    useEffect(() => {
        const interval = setInterval(() => {
            min = getMinDiffrence()
            hour = getHourDiffrence()
        }, 60000)
        return () => { clearInterval(interval) }
    }, [])
    function getHourDiffrence() {
        return moment.duration(moment().diff(moment(clock,'hh:mm:ss'))).hours()
    }
    function getMinDiffrence() {
        return moment.duration(moment().diff(moment(clock,'hh:mm:ss'))).minutes()
    }
    return (
        <Card>
            <div className="flex flex-col justify-center items-center">
                <p>You Are Clocked In For</p>
                <p><span className="text-3xl font-black text-orange-400">{hour}</span>h<span className="text-3xl font-black text-orange-500">{min}</span>min</p>
            </div>

        </Card>
    );
};

export default DurationCard;