
import { useDispatch, useSelector } from "react-redux";
import logo from "../../src/images/Final-Pad.png";
import paid from "../../src/images/th.jpeg";
import "./Invoice.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { True } from "../store/DrawarStore";
import { FaCheckCircle } from "react-icons/fa";
import { Timeline } from "flowbite-react";
import {AiFillPhone, AiTwotoneMail} from 'react-icons/ai';
import { HiLocationMarker } from "react-icons/hi";

const Payment_invoice = () => {
    const dispatch = useDispatch()
  const [newData, setNewdata] = useState(null);
  const data = useSelector((state) => state.Payment.value);
  useEffect(() => {
    if (data) {
      setNewdata(data[0]);
    }
    console.log('data');
  }, []);
  function Print() {
    // dispatch(True())
    print();
  }
  function Back() {
    dispatch(True())
    // print();
  }
  return (
    <div className="relative">
    <Link to='/student' id='back'className="absolute left-2 "><button onClick={Back} className="bg-lime-600 px-6 py-2 text-white mt-6 ml-6 mx-auto">Back</button></Link>
    <button  className="bg-lime-600 px-6 py-2 absolute right-2  text-white mt-6 ml-6 mx-auto" id="print" onClick={Print}>Print</button>
    <div className="flex justify-center items-center  ">
      {/* <h1>Print</h1> */}
      <div
      
        className=" font-Rovoto  p-4 w-[793.70px] h-[1020px]  relative mb-7 "
        
      >
        
        <div className="flex justify-between items-center">
          
        <img src={logo} className="w-40 h-40"></img>
          {/* <img src={paid} className="w-40 h-40"></img> */}
          <div className="flex justify-center">
          <span className="font-bold text-2xl border-b-2 border-black ">
            Consignment
          </span>
        </div>
        
          <div className="text-[14px]">
            <p>
              <addr className="font-bold">Consignment no :</addr>
              {newData && newData[0].reg_id}
            </p>
            <p>
              <addr className="font-bold">Date : </addr>
              {moment().format("D-MMM-YYYY")}
            </p>
          </div>
        </div>
        {/* 2nd */}
        <div className="flex justify-between items-center text-[14px]">
          <article>
            <p>
              <addr className="font-bold">Name : </addr>{" "}
              {newData && newData[0]?.reg_fullname}
            </p>
            <p>
              <addr className="font-bold">Email :</addr>
              {newData && newData[0]?.reg_email}
            </p>
          </article>
          <article>
            <p>
              <addr className="font-bold">Contact No : </addr>
              {newData && newData[0]?.reg_mobile}
            </p>
            <p>
              <addr className="font-bold">Installment : </addr>
              {newData && newData[0]?.installment}
            </p>
          </article>
        </div>
        <table className="w-full  border-collapse break-all mt-2">
          <thead>
            <tr className="text-[14px]">
              <th className="border border-black ">Description</th>
              <th className="border border-black ">Amount</th>
            </tr>
          </thead>
          <tbody>
            {newData &&
              newData[1].map((x, index) => {
                return (
                  <tr key={index} className="text-[14px]">
                    <td className="border border-black pl-5">
                      <pre className=" w-[300px] break-all">
                        ({moment(x.time).format("D-MMM-YYYY")}) - {newData && newData[0]?.reg_course}
                      </pre>
                   
                    </td>
                    <td className="border border-black pl-5  ">{x.amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* table End  */}
        <div className="flex justify-between text-[14px]">
          <p>
            <addr className="font-bold">Amount In Words : </addr>
            {newData && newData[2]}
          </p>
          <p className="mr-10">
            <addr className="font-bold">Total :</addr>
            {newData && newData[3]}
          </p>
        </div>
        <div className="flex justify-center">
        <img src={paid} className="w-40 h-40"></img>
        </div>
         
        <div className="">
        <div className="term_condition ">
          <h2 className="font-bold text-[20px] mt-10">Terms & Conditions:</h2>
          <p className="text-[14px]">
            Admission for a course, together with the payment of the
            dues/required deposit, constitutes an abiding agreement on the
            student to follow the courses.
          </p>
          <ul className="mt-2 text-[14px]">
            <li className="flex">
              <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              The eligibility criteria for each course as set out in the
              prospectus must be followed.
            </li>
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              All dues must be paid in full prior to commencement of the course.
              If you do not complete your 2nd installment on time, a 10% penalty
              of the course fee will be applied to the due amount.
            </li>
            <li className="flex">

            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              The authority will not allow students to appear in the final exams
              if their attendance in class is less than 75%. Absence through
              illness must be supported by a medical certificate.
            </li>
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>

              Behavior that puts other students and staff at risk or in a
              harmful/dangerous situation will not be tolerated and disciplinary
              procedures will be implemented.
            </li>
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              By signing this you are bound to rules and regulation &
              disciplinary code of conduct.
            </li>
            <li className="flex">
     
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              The authority has the right to alter the timetable, location,
              number of classes, method of delivery, content, Assessment and
              syllabus of your course, provided such alterations are reasonable.
            </li>
            <li className="flex items-center">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              In the case of a batch transfer, students must submit a transfer
              application and cover the 30% course fee charge specifically
              designated for batch transfers.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-[20px] ">Refund policy:</h2>
          <ul className="mt-2 text-[14px]">
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px] "></FaCheckCircle></span>
            Seat booking fee is non-refundable
           </li>
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              For refund eligibility you have to complete first two (2) classes
              and submit homework within the given timeframe. No fee will refund
              thereafter time has passed
            </li>
            <li className="flex">
            <span className=" flex items-center justify-center"><FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle></span>
              After completing first two classes you'll get 24 hours time to
              apply for refund
            </li>
          </ul>
        </div>
        </div>

        {/* <div className=" mt-24  ">
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
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default Payment_invoice;
