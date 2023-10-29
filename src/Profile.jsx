import { Card, Avatar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import axios from 'axios';
import ApiUrl from './ApiUrl';
import TimeCard from './TimeCard';
import moment from 'moment';
const Profile = () => {
    const [emp, setEmp] = useState({})
    const [atten, setAtten] = useState([])
    let id = sessionStorage.getItem('id')
    useEffect(() => {
        axios.get(`${ApiUrl.ProfileUrl}${id}/`).then(res => {
            setEmp(res.data)

        }).catch(error => console.log(error))

        axios.get(`${ApiUrl.AttendUrl}${id}/`).then(res => {
            let data=res.data
            let month = moment().month() + 1
            let year = moment().year()
            let date = moment().date()
            let newAtten = new Array()

            for (let index = 1; index <= date; index++) {
                let x = null
                for (let index2 = 0; index2 < data?.length; index2++) {
                    const element = data[index2];
                    if (moment(element).date() == index) {
                        x = index2
                    }
                }
                if (x != null) {
                    newAtten.push(data[x])
                    data?.splice(x, 1)

                } else {
                    let newDate = moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format()
                    newAtten.push(newDate)
                }
            }
            setAtten(newAtten)

        }).catch(error => console.log(error))

    }, [])


    return (
        <div className='flex mx-10 mt-5 gap-4'>
            <div>
                <Card>
                    <Avatar
                        img={emp?.image}
                        size="xl"
                        rounded
                    />
                    <p>Name: {emp?.name}</p>
                    <p>Gender: {emp?.gender}</p>
                    <p>Designation: {emp?.designation}</p>
                    <p>Phone: {emp?.phone}</p>
                    <p>Address: {emp?.addr}</p>
                </Card>
            </div>
            <div className='flex-1 gap-4 flex flex-col'>
                <TimeCard></TimeCard>

                <Card >

                    <table>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Weekday</td>
                                <td>Date</td>
                                <td>status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                atten?.map((x, index) => {
                                    let isAtten=false
                                    let isWeekend=false
                                    console.log(x)
                                    if (moment(x).hour()!=0) {
                                        isAtten=true
                                    }
                                    if (moment(x).format('d')==5 || moment(x).format('d')==6 ) {
                                        isWeekend=true
                                    }


                                    return (
                                        <tr key={index} className={`${isWeekend && "bg-red-400"}`}>
                                            <td>{index}</td>
                                            <td >{moment(x).format('dddd')}</td>
                                            {
                                                isAtten ? <td>{moment(x).format('MMM Do,h:mm a')}</td> : <td>{moment(x).format('DD-MM-YYYY ')}</td>
                                            }
                                            {
                                                isAtten ? <td><AiFillCheckCircle className='text-green-400 text-2xl'></AiFillCheckCircle></td> : <td><AiFillCloseCircle className='text-red-600 text-2xl'></AiFillCloseCircle></td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </Card>


            </div>
        </div>
    );
};

export default Profile;
