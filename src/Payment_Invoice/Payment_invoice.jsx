import { Timeline } from "flowbite-react";
import { AiFillPhone, AiTwotoneMail } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { useSelector } from "react-redux";
import logo from "../../src/images/Final-Pad.png";
import "./Invoice.css";
import moment from "moment";
import { useEffect, useState } from "react";

const Payment_invoice = () => {
    const [newData,setNewdata]=useState(null)
  const data = useSelector((state) => state.Payment.value);
  useEffect(()=>{
    if(data){
        setNewdata(data[0])
      }
  },[])
  
  
//   const newData=data
  //   const newData=data.flat(Infinity);
    // console.log(newData[1]);
  return (
    <div className="flex justify-center items-center">
      {/* <h1>Print</h1> */}
      <div
        id="print"
        className=" font-Rovoto shadow-md p-4 w-[793.70px] h-[1122.52px] relative mb-7 "
      >
        <div className="flex justify-center">
          <span className="font-bold text-2xl border-b-2 border-black ">
            Consignment
          </span>
        </div>
        <div className="flex justify-between items-center">
          <img src={logo} className="w-40 h-40"></img>
          <div className="">
            <p>
              <addr className="font-bold">Consignment no :</addr>
            </p>
            <p>
              <addr className="font-bold">Date : </addr>
              {moment().format("MMM Do YY")}
            </p>
          </div>
        </div>
        {/* 2nd */}
        <div className="flex justify-between items-center">
          <article>
            <p>
              <addr className="font-bold">Name : </addr> { newData && newData[0]?.reg_fullname}
            </p>
            <p>
              <addr className="font-bold">Email :</addr>{  newData && newData[0]?.reg_email}
            </p>
          </article>
          <article>
            <p>
              <addr className="font-bold">Contact No : </addr>{  newData && newData[0]?.reg_mobile}
            </p>
            <p>
              <addr className="font-bold">Installment : </addr>{ newData && newData[0]?.installment}
            </p>
          </article>
        </div>
        <table className="w-full  border-collapse break-all">
          <thead>
            <tr>
              <th className="border border-black ">Description</th>
              <th className="border border-black ">Amount</th>
            </tr>
          </thead>
          <tbody>

            {
                 newData &&  newData[1].map((x,index)=>{
                    return(
                        <tr key={index}>
                        <td className="border border-black pl-5">
                          <pre className=" w-[300px] break-all">{moment(x.time).format("MMM Do YY")} </pre>
                        </td>
                        <td className="border border-black pl-5  ">{x.amount}</td>
                      </tr>
                    )
                })
            }
          
          </tbody>
        </table>
        {/* table End  */}
        <div className="flex justify-between">
          <p>
            <addr className="font-bold">Amount In Words : </addr>
            {newData&& newData[2]}
          </p>
          <p className="mr-10">
            <addr className="font-bold">Total :</addr>
            {newData&& newData[3]}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-[20px] ">Terms & Conditions:</h2>
          <p>
            Admission for a course, together with the payment of the
            dues/required deposit, constitutes an abiding agreement on the
            student to follow the courses.
          </p>
          <ul className="mt-2">
            <li className="list-item">
              The eligibility criteria for each course as set out in the
              prospectus must be followed.
            </li>
            <li className="list-item">
              All dues must be paid in full prior to commencement of the course.
              If you do not complete your 2nd installment on time, a 10% penalty
              of the course fee will be applied to the due amount.
            </li>
            <li className="list-item">
              {" "}
              The authority will not allow students to appear in the final exams
              if their attendance in class is less than 75%. Absence through
              illness must be supported by a medical certificate.
            </li>
            <li className="list-item">
              {" "}
              Behavior that puts other students and staff at risk or in a
              harmful/dangerous situation will not be tolerated and disciplinary
              procedures will be implemented.
            </li>
            <li className="list-item">
              By signing this you are bound to rules and regulation &
              disciplinary code of conduct.
            </li>
            <li className="list-item">
              {" "}
              The authority has the right to alter the timetable, location,
              number of classes, method of delivery, content, Assessment and
              syllabus of your course, provided such alterations are reasonable.
            </li>
            <li className="list-item">
              {" "}
              In the case of a batch transfer, students must submit a transfer
              application and cover the 30% course fee charge specifically
              designated for batch transfers.
            </li>
          </ul>
        </div>
        <div>
        <h2 className="font-bold text-[20px] ">Refund policy:</h2>
        <ul className="mt-2">
            <li className="list-item">
            Seat booking fee is non-refundable
            </li>
            <li className="list-item">
            For refund eligibility you have to complete first two (2) classes and submit homework within the given
timeframe. No fee will refund thereafter time has passed
            </li>
            <li className="list-item">
            After completing first two classes you'll get 24 hours time to apply for refund
            </li>
        </ul>
        </div>

        <div className="  absolute bottom-0 left-0 right-0 p-3">
          <div className="w-full flex justify-between mb-3">
            <span className=" leading-8 border-t-4 border-dotted border-black ">
              Employee Signature
            </span>
            <span className="leading-8 border-t-4 border-dotted border-black ">
              Authority Signature
            </span>
          </div>
          <Timeline horizontal className=" text-black ">
            <Timeline.Item className=" w-1/3 ">
              {/* <Timeline.Point icon={HiCalendar}  /> */}
              <div className="relative h-1 bg-[#69D4DD]">
                <HiLocationMarker className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full" />
              </div>
              <Timeline.Content>
                <Timeline.Body className="text-center text-black">
                  House No-1,Block-B,Banasree,
                  <br />
                  Main Road,Rampura,Dhaka-1219
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item className=" w-1/3 ">
              {/* <Timeline.Point icon={HiCalendar} /> */}
              <div className="relative h-1 bg-[#69D4DD]">
                <AiTwotoneMail className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full" />
              </div>
              <Timeline.Content>
                <Timeline.Body className="text-black text-center">
                  www.arenawebsecurity.net
                  <br />
                  support@arenawebsecurity.net
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item className=" w-1/3 ">
              {/* <Timeline.Point icon={HiCalendar} /> */}
              <div className="relative h-1 bg-[#69D4DD]">
                <AiFillPhone className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full" />
              </div>
              <Timeline.Content>
                <Timeline.Body className="text-black text-right">
                  +8800188663989
                  <br />
                  +8801779224640
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Payment_invoice;
