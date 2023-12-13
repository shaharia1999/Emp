import { Card, Avatar, Button } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import ApiUrl from "./ApiUrl";
import TimeCard from "./TimeCard";
import moment from "moment";
import DurationCard from "./DurationCard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { myContext } from "./App";
const Profile = () => {
  const [emp, setEmp] = useState({});
  const [atten, setAtten] = useState([]);
  const navigate = useNavigate();
  let id = localStorage.getItem("id");
  const {setType}=useContext(myContext);
  useEffect(() => {
    getProfileInfo();
    getAttenDanceInfo();
    
  }, []);
  // useEffect(() => {
  //   if (!types) {
  //     // Your initial setup logic here
  //     setTypes(true);
  //   } else {
  //     // Reload logic here
  //     location.reload();
  //   }
  // }, [types]);
 

  function getProfileInfo() {
    axios
      .get(`${ApiUrl.ProfileUrl}${id}/`)
      .then((res) => {
        setEmp(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
  function getAttenDanceInfo() {
    axios
      .get(`${ApiUrl.AttendUrl}${id}/`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        let month = moment().month() + 1;
        let year = moment().year();
        let date = moment().date();
        let newAtten = new Array();
        for (let index = date; index > 0; index--) {
          let x = null;
          for (let index2 = 0; index2 < data?.length; index2++) {
            const element = data[index2].date;
            if (moment(element).date() == index) {
              x = index2;
            }
          }
          if (x != null) {
            let t = {
              date: data[x].date,
              clock_in: moment(data[x].clock_in, "hh:mm:ss").format("hh:mm a"),
            };
            if (data[x].clock_out != null) {
              t.clock_out = moment(data[x].clock_out, "hh:mm:ss").format(
                "hh:mm a"
              );
            } else {
              t.clock_out = null;
            }
            newAtten.push(t);
            data.splice(x, 1);
          } else {
            let newDate = {
              date: moment(`${year}-${month}-${index}`, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              ),
              clock_in: null,
              clock_out: null,
            };
            newAtten.push(newDate);
          }
        }
        console.log(newAtten);
        setAtten(newAtten);
      })
      .catch((error) => console.log(error));
  }
  function ClockIn() {
    Swal.fire({
      title: `Clock In`,
      text: `Are you currently timestamped for ${moment().format(
        "dddd, MMMM Do YYYY,h:mm a"
      )}?`,
      icon: "question",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      console.log(res.isConfirmed);
      if (res.isConfirmed) {
        let id = localStorage.getItem("id");
        if (id != null) {
          axios
            .post(ApiUrl.ClockIn, { id })
            .then(() => {
              getProfileInfo();
              getAttenDanceInfo();
            })
            .catch((error) =>  Swal.fire({
              title: error.response.msg,
              text:error.response.data.msg,
              icon: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: true,
              showCancelButton: true,
            }));
        }
      }
    });
  }
  function ClockOut() {
    Swal.fire({
      title: "Are You Sure You want to Clock out?",
      text: "Clocking out signifies the completion of your day's work, or were you referring to logging out?",
      icon: "warning",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        let id = localStorage.getItem("id");
        if (id != null) {
          axios
            .post(ApiUrl.ClockOut, { id })
            .then(() => {
              getAttenDanceInfo();
              // localStorage.clear();
              emp.clock = false;
              // navigate('/login')
            })
            .catch((error) => {
              Swal.fire({
                title: error.response?.msg,
                text:error.response.data?.msg,
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: true,
                showCancelButton: true,
              })
            });
        }
      }
    });
  }
  function Logout() {
    localStorage.clear();
    setType(null)
    navigate("/login");
    location.reload()
  }
  return (
    <div className="lg:flex block md:px-10 px-2 pt-20 md:gap-4 bg-[#C6D3E1]">
{/*      
      <div className="flex flex-col gap-3 w-96">
        <Card>
          <Avatar img={`${ApiUrl.BaseUrl}media/Profile/${emp?.image}`} size="xl" rounded />
          <p><addr className='font-medium'>Name:</addr> {emp?.name}</p>
          <p><addr className='font-medium'>Gender:</addr> {emp?.gender}</p>
          <p><addr className='font-medium'>Designation:</addr> {emp?.designation}</p>
          <p><addr className='font-medium'>Phone: </addr>{emp?.phone}</p>
          <p><addr className='font-medium'>Address: </addr>{emp?.addr}</p>
          <p><addr className='font-medium'>Desktop:</addr> {emp?.pc} </p>
        </Card>
        <Button gradientDuoTone="purpleToPink" onClick={Logout}>
          Logout
        </Button>
      </div> */}
      <div className="w-full">
        {/* <div className="md:flex w-full  block ">
        {emp.clock != false ? (
          <DurationCard clock={emp.clock}></DurationCard>
        ) : (
          ""
        )}
        <TimeCard
          clock={emp?.clock}
          ClockIn={ClockIn}
          ClockOut={ClockOut}
        ></TimeCard>
        </div> */}
        <div className="bg-white py-5">
        <div className="flex justify-between bg-[#D0ECF0] mx-5 py-5 px-5 rounded-t-md">
          <article>
          <p><addr className='font-medium'>Name:</addr> {emp?.name}</p>
          <p><addr className='font-medium'>Designation:</addr> {emp?.designation}</p>
          <p><addr className='font-medium'>Phone: </addr>{emp?.phone}</p>
          </article>
          {/* <article><Avatar className="mt-[-30px] w-60 h-48 bg-red-500 bg-cover" img={`${ApiUrl.BaseUrl}media/Profile/${emp?.image}`}  rounded imgClassName="w-full h-full object-cover" /></article> */}
          <article>
            <img className="rounded-full w-56 h-56 mt-[-100px]" src={`${ApiUrl.BaseUrl}media/Profile/${emp?.image}`}/>
     
            </article>
       
          <article>
          <p><addr className='font-medium'>Desktop:</addr> {emp?.pc} </p>
          <p><addr className='font-medium'>Gender:</addr> {emp?.gender}</p>
          </article>
        </div>
        </div>
        <div className="bg-[#F9FAFB] rounded-b-md">
          <div className="md:flex w-full  block ">
       
        <TimeCard
          clock={emp?.clock}
          ClockIn={ClockIn}
          ClockOut={ClockOut}
        ></TimeCard>
        </div>
        </div>
        <div className=" ">
        <div className=" md:p-5">
                <input type="checkbox" name="" id="" className="bg-red-400 mr-4" />
                <label>Holidays</label>
                </div>
          <Table className="text-[12px] md:text-[16px] mt-2">
            <Table.Head className="">
              {/* <Table.HeadCell className="hidden  lg:table-cell">No.</Table.HeadCell> */}
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Weekday</Table.HeadCell>
              <Table.HeadCell>Clock in</Table.HeadCell>
              <Table.HeadCell>Clock Out</Table.HeadCell>
            </Table.Head>
            <Table.Body className="">
              {atten?.map((x, index) => {
                let isHoldiay =
                  moment(x.date).format("d") == 5 ||
                  moment(x.date).format("d") == 6;
                return (
                  <Table.Row
                    key={index}
                    className={`text-black border-4  bg-white border-white ${
                      isHoldiay ?" rounded-lg bg-red-400 ": 'odd:bg-[#f0f0f0] '
                    }`}
                  >
                    {/* <Table.Cell className="rounded-l-xl hidden lg:table-cell">
                      {index + 1}
                    </Table.Cell> */}
                    <Table.Cell>{x.date}</Table.Cell>
                    <Table.Cell>{moment(x.date).format("dddd")}</Table.Cell>
                    <Table.Cell>{x.clock_in}</Table.Cell>
                    <Table.Cell className="rounded-r-xl">
                      {x.clock_out}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
