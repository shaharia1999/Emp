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
  console.log(setType);
  useEffect(() => {
    getProfileInfo();
    getAttenDanceInfo();
  }, []);

  function getProfileInfo() {
    axios
      .get(`${ApiUrl.ProfileUrl}${id}/`)
      .then((res) => {
        console.log(res.data);
        setEmp(res.data);
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
            .catch((error) => console.log(error));
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
              console.log(error);
            });
        }
      }
    });
  }
  function Logout() {
    localStorage.clear();
    setType(null)
    navigate("/login");
  }

  return (
    <div className="lg:flex block md:mx-10 mx-2 mt-5 md:gap-4">
      <div className="flex flex-col gap-3">
        <Card>
          <Avatar img={emp?.image} size="xl" rounded />
          <p>Name: {emp?.name}</p>
          <p>Gender: {emp?.gender}</p>
          <p>Designation: {emp?.designation}</p>
          <p>Phone: {emp?.phone}</p>
          <p>Address: {emp?.addr}</p>
        </Card>
        <Button gradientDuoTone="purpleToPink" onClick={Logout}>
          Logout
        </Button>
      
      </div>
      <div className="w-full">
        <div className="md:flex w-full gap-1 block ">
        {emp.clock != false ? (
          <DurationCard clock={emp.clock}></DurationCard>
        ) : (
          ""
        )}
        <TimeCard
          clock={emp.clock}
          ClockIn={ClockIn}
          ClockOut={ClockOut}
        ></TimeCard>
        
        </div>
      

        <div className=" md:p-5">
          <Table className="text-[12px] md:text-[16px] mt-2">
            <Table.Head className="">
              <Table.HeadCell className="hidden  lg:table-cell">No.</Table.HeadCell>
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
                    className={`text-black border-4 odd:bg-[#f0f0f0]  bg-white border-white ${
                      isHoldiay && " rounded-lg"
                    }`}
                  >
                    <Table.Cell className="rounded-l-xl hidden lg:table-cell">
                      {index + 1}
                    </Table.Cell>
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
