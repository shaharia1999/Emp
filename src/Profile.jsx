import { Card, Avatar } from 'flowbite-react';
import { IoHandRightOutline } from "react-icons/io5";
import moment from 'moment'
import { useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
const Profile = () => {
    const [now, setNow] = useState(moment())



    setInterval(() => { setNow(moment()) }, 1000)
    return (
        <div className='flex mx-10 mt-5 gap-4'>
            <div>
                <Card>
                    <Avatar
                        img="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        size="xl"
                        rounded
                    />
                    <p>Name: Md. Huzaifa</p>
                    <p>Gender: Male</p>
                    <p>Designation: Backend Developer</p>
                    <p>Phone: 01788888888</p>
                    <p>Address: Mirhajirbag, Jatrabari</p>
                </Card>
            </div>
            <div className='flex-1 gap-4 flex flex-col'>
                <Card >
                    <div className='flex flex-col justify-center items-center gap-5'>
                        {now.format('dddd')}
                        <IoHandRightOutline className='text-2xl '></IoHandRightOutline>
                        {now.format('MMMM Do YYYY, h:mm:ss a')}
                    </div>

                </Card>
                <Card >

                    <table>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Date</td>
                                <td>status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>12/12/2023, 11:56am</td>
                                <td><AiFillCheckCircle></AiFillCheckCircle></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td><AiFillCloseCircle></AiFillCloseCircle></td>
                            </tr>
                        </tbody>
                    </table>


                </Card>
            </div>
        </div>
    );
};

export default Profile;
