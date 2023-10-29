import { Card, Avatar, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import axios from 'axios';
import ApiUrl from './ApiUrl';
import TimeCard from './TimeCard';
import moment from 'moment';
import DurationCard from './DurationCard';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Profile = () => {
    const [emp, setEmp] = useState({})
    const [atten, setAtten] = useState([])
    const navigate = useNavigate()
    let id = sessionStorage.getItem('id')
    useEffect(() => {
        getProfileInfo()

        axios.get(`${ApiUrl.AttendUrl}${id}/`).then(res => {
            let data = res.data
            let month = moment().month() + 1
            let year = moment().year()
            let date = moment().date()
            let newAtten = new Array()

            for (let index = date; index > 0; index--) {
                let x = null
                for (let index2 = 0; index2 < data?.length; index2++) {
                    const element = data[index2].created_at;
                    if (moment(element).date() == index) {
                        x = index2
                    }
                }
                if (x != null) {
                    newAtten.push(data[x])
                    data?.splice(x, 1)

                } else {

                    let newDate = { 'created_at': moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format(), 'clock_out': '' }
                    newAtten.push(newDate)
                }
            }
            console.log(newAtten)
            setAtten(newAtten)

        }).catch(error => console.log(error))

    }, [])

    function getProfileInfo() {
        axios.get(`${ApiUrl.ProfileUrl}${id}/`).then(res => {
            console.log(res.data)
            setEmp(res.data)
        }).catch(error => console.log(error))
    }
    function getAttenDanceInfo() {
        
    }
    function ClockIn() {
        Swal.fire({
            title: `Clock In`,
            text: `are you Clocking In at ${moment().format('dddd, MMMM Do YYYY,h:mm:ss a')}?`,
            icon: 'question',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: true,
            showCancelButton: true,
        }).then(res => {
            if (res.isConfirmed) {
                let id = sessionStorage.getItem('id')
                if (id != null) {
                    axios.post(ApiUrl.ClockIn, { id })
                        .then(res => {
                            axios.get(`${ApiUrl.ProfileUrl}${id}/`).then(res => {
                                console.log(res.data)
                                setEmp(res.data)
                            }).catch(error => console.log(error))
                        }).catch(error => {
                            console.log(error)
                        })
                }
            }
        })

    }
    function ClockOut() {
        Swal.fire({
            title: "Are You Sure You want to Clock out?",
            text: 'Clock out mean you are finished for the day. or did you mean logout',
            icon: 'warning',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: true,
            showCancelButton: true,

        }).then(res => {
            if (res.isConfirmed) {
                let id = sessionStorage.getItem('id')
                if (id != null) {

                    axios.post(ApiUrl.ClockOut, { id })
                        .then(res => {
                            console.log(res.data);
                            sessionStorage.clear();
                            emp.clock = false;
                            navigate('/login')
                        }).catch(error => {
                            console.log(error)
                        })

                }
            }
        })

    }
    function Logout() {
        sessionStorage.clear();
        navigate('/login');
    }



    return (
        <div className='flex mx-10 mt-5 gap-4'>
            <div className='flex flex-col gap-3'>
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
                <Button gradientDuoTone="purpleToPink" onClick={Logout}>
                    Logout
                </Button>
                {
                    emp.clock != false ?
                        <DurationCard clock={emp.clock} ></DurationCard> : ""
                }
            </div>
            <div className='flex-1 gap-4 flex flex-col'>
                <TimeCard clock={emp.clock} ClockIn={ClockIn} ClockOut={ClockOut}></TimeCard>

                <Card >
                    <Card >
                        <div className='flex justify-between p-1'>
                            <p className='font-semibold'>No.</p>
                            <p className='font-semibold'>Weekday</p>
                            <p className='font-semibold'>Clock In</p>
                            <p className='font-semibold'>Clock Out</p>
                            <p className='font-semibold'>status</p>
                        </div>


                    </Card>
                    {
                        atten?.map((x, index) => {
                            let isAtten = false
                            let isWeekend = false

                            if (moment(x.created_at).hour() != 0) {
                                isAtten = true
                            }
                            if (moment(x.created_at).format('d') == 5 || moment(x.created_at).format('d') == 6) {
                                isWeekend = true
                            }



                            return (
                                <Card key={index} className={`${isWeekend && "bg-red-400"}`}>
                                    <div className='flex justify-between' >
                                        <p >{index + 1}</p>
                                        <p >{moment(x.created_at).format('dddd')}</p>

                                        <p>{
                                            isAtten ? moment(x.created_at).format('MMM Do,h:mm a') : moment(x.created_at).format('DD-MM-YYYY ')
                                        }</p>
                                        <p>
                                            {
                                                isAtten ? moment(x.clock_out).format('MMM Do,h:mm a') :  <pre>   </pre>
                                            }
                                        </p>
                                        <p >{
                                            isAtten ? <AiFillCheckCircle className='text-green-400 text-2xl'></AiFillCheckCircle> : <AiFillCloseCircle className='text-red-600 text-2xl'></AiFillCloseCircle>
                                        }</p>
                                    </div>


                                </Card>
                            )
                        })
                    }


                    {/* <table>
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
                    </table> */}


                </Card>


            </div>
        </div>
    );
};

export default Profile;
