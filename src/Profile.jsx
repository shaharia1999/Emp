import { Card, Avatar, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
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
        getAttenDanceInfo()
    }, [])

    function getProfileInfo() {
        axios.get(`${ApiUrl.ProfileUrl}${id}/`).then(res => {
            console.log(res.data);
            setEmp(res.data)
        }).catch(error => console.log(error))
    }
    function getAttenDanceInfo() {
        axios.get(`${ApiUrl.AttendUrl}${id}/`).then(res => {
            const data = res.data
            console.log(data);
            let month = moment().month() + 1
            let year = moment().year()
            let date = moment().date()
            let newAtten = new Array()

            for (let index = date; index > 0; index--) {
                let x = null
                for (let index2 = 0; index2 < data?.length; index2++) {
                    const element = data[index2].date;
                    if (moment(element).date() == index) {
                        x = index2
                    }
                }
                if (x != null) {
                    let t = { 'date': data[x].date ,clock_in: moment(data[x].clock_in,'hh:mm:ss').format('hh:mm a') }
                    if (data[x].clock_out != null) {
                        t.clock_out =  moment(data[x].clock_out ,'hh:mm:ss').format('hh:mm a')
                    } else {
                        t.clock_out = null
                    }
                    newAtten.push(t)
                    data.splice(x, 1);
                } else {

                    let newDate = { 'date': moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format("YYYY-MM-DD"), 'clock_in': null, 'clock_out': null }
                    newAtten.push(newDate)
                }
            }
            console.log(newAtten);
            setAtten(newAtten)



        }).catch(error => console.log(error))
    }
    function ClockIn() {
        Swal.fire({
            title: `Clock In`,
            text: `Are you currently timestamped for ${moment().format('dddd, MMMM Do YYYY,h:mm a')}?`,
            icon: 'question',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: true,
            showCancelButton: true,
        }).then(res => {
            console.log(res.isConfirmed)
            if (res.isConfirmed) {
                let id = sessionStorage.getItem('id')
                if (id != null) {
                    axios.post(ApiUrl.ClockIn, { id }).then(() => {
                        getProfileInfo();
                        getAttenDanceInfo()
                    }).catch(error=>console.log(error))
                }
            }
        })

    }
    function ClockOut() {
        Swal.fire({
            title: "Are You Sure You want to Clock out?",
            text: "Clocking out signifies the completion of your day's work, or were you referring to logging out?",
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
                        .then(() => {
                            getAttenDanceInfo()
                            // sessionStorage.clear();
                            emp.clock = false;
                            // navigate('/login')
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
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>
                                No.
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Date
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Weekday
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Clock in
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Clock Out
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {
                                atten?.map((x, index) => {
                                    let isHoldiay=moment(x.date).format('d')==5 || moment(x.date).format('d')==6
                                    return (
                                        <Table.Row key={index} className={`text-black border-4 drop-shadow-md bg-white border-white ${isHoldiay && "bg-red-300 rounded-lg"}`}>
                                            <Table.Cell className='rounded-l-xl'>{index + 1}</Table.Cell>
                                            <Table.Cell>{x.date}</Table.Cell>
                                            <Table.Cell>{moment(x.date).format('dddd')}</Table.Cell>
                                            <Table.Cell>{x.clock_in}</Table.Cell>
                                            <Table.Cell className='rounded-r-xl'>{x.clock_out}</Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
