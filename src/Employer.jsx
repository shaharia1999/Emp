import axios from "axios";
import { TextInput } from "flowbite-react";
import ApiUrl from "./ApiUrl";
import { useState, useEffect } from "react";
import moment from "moment";
import { toWords } from "number-to-words";
import Swal from "sweetalert2";
import { Add } from "./store/Invoice";
import { False} from "./store/DrawarStore";

// new
import { useDispatch, useSelector } from "react-redux";
import logo from "../src/images/Final-Pad.png";
import paid from "../src/images/paid.png";
import "../src/Payment_Invoice/Invoice.css";
import { FaCheckCircle } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import NavBar from "./NavBar";

// console.log(id);
const path = location.pathname;
console.log(path);
const Employers = () => {
  const [student, setStudent] = useState(null);
  const drawar = useSelector((state) => state.drawar.value);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [newData, setNewdata] = useState(null);
  const data = useSelector((state) => state.Payment.value);
  const loading = useSelector((state) => state.drawar.value);
  const [pdfName, setPdfName] = useState("generated.pdf");
  const date = moment().format("D-MMM-YYYY");


  useState(() => {
    console.log(drawar);
    //  dispatch(True())
  }, [drawar]);



  function Search() {
    let email = document.getElementById("title").value.trim();
    let id = localStorage.getItem("id");
    axios
      .get(ApiUrl.Type + `/${id}`)
      .then((res) => {
        // console.log(res);
        axios
          .post(ApiUrl.getStudentInfo, {
            huzaifa: String(res.data.aws_id).toLowerCase(),
            shaharia: email,
          })
          .then((res) => {
            setStudent(res.data);
         
            let count = 0;
            res.data[1]?.forEach((x) => {
              console.log(Number(x.amount));
              count += Number(x.amount);
            });
            setTotal(count);
            document.getElementById("title").value = "";
          })
          .catch((err) => {
            console.log(err.response.data.msg);
            Swal.fire({
              title: err.response.data.msg,
              text: err.response.data.msg,
              icon: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: true,
              showCancelButton: true,
            });
            document.getElementById("title").value = "";
          });
      })
      .catch((err) => {
        Swal.fire({
          title: err.response.data.msg,
          text: err.response.data.msg,
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: true,
          showCancelButton: true,
        });
      });
  }
  function Remove(index) {
    student[1]?.splice(index, 1);
    console.log(student);
    setStudent([...student]);
    let count = 0;
    student[1]?.forEach((x) => {
      count += Number(x.amount);
    });
    setTotal(count);
  }
  const PDf = () => {
    // e.preventDefault();
    let wordtotal = document.getElementById("wordtotal").innerText;
    // student.push(wordtotal,total)
    dispatch(False());
    dispatch(Add(student, wordtotal));
  };

  useEffect(() => {
    console.log(loading);
    if (data) {
      setNewdata(data[0]);
    }
    console.log("data");
  }, [loading]);


  const generatePDF = () => {
    const content = document.getElementById('content');
    html2canvas(content, { scale: 2, logging: false }).then(function (canvas) {
      const cleanFileName = (student[0]?.reg_email + date).replace(
        /[^\w]/g,
        "_"
      );
      const imgData = canvas.toDataURL('image/jpeg', 0.7); // Change format to JPEG and adjust quality to 0.7
  
      // Adjust the compression settings in the jsPDF constructor
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true, // Enable compression
        precision: 8, // Set the precision for compression
      });
  
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // Use A4 dimensions (adjust as needed)
      pdf.save(cleanFileName);
      document.getElementById('main').style.display = 'none';
    });
  };
  


  const handleDownload = () => {
    document.getElementById("main").style.display = "block";
    PDf();
      generatePDF(pdfName);

  };
  return (
    <div>
       <div>
                              <marquee>
            <addr className="font-bold">Notice : </addr>
            Arrive promptly at 10:10 a.m. and depart at 6:00 p.m. Any arrival
            after 10:10 a.m. is considered late.
            <span className="text-red-500">
              {" "}
              Three instances of tardiness will result in a deduction of one
              day's salary..
            </span>
          </marquee>
                    <NavBar></NavBar>
                </div>
      <div className="flex  justify-center font-Rovoto">
        <div>
          <div className="w-[768px] relative px-10">
            <input id="title" required type="text" name="title"  className="OutLine rounded-3xl border border-[#0891B2] focus:border-[#0891B2] focus:outline-none w-full" />
            <addr
              className="bg-[#0891B2] hover:bg-lime-600 px-4 py-[9px] absolute right-0 top-0 rounded-r-3xl text-white cursor-pointer"
              onClick={Search}
            >
              Search
            </addr>
          </div>
          {student && (
            <div
              id="print"
              className=" mt-4 shadow-md p-4 w-[768px] h-[1056px] relative mb-7 "
            >
              <center className="text-2xl ">{student[0]?.reg_fullname}</center>
              <div className="flex justify-between mt-5">
                <div>
                  {" "}
                  <p>
                    <addr className="font-semibold">Course : </addr>
                    {student[0]?.reg_course}
                  </p>
                  <p>
                    <addr className="font-semibold">Mobile :</addr>{" "}
                    {student[0]?.reg_mobile}
                  </p>
                  <p>
                    <addr className="font-semibold">Email :</addr>{" "}
                    {student[0]?.reg_email}
                  </p>
                </div>
                <div>
                  <p>
                    <addr className="font-semibold">Installment :</addr>
                    {student[0]?.installment}
                  </p>
                  <p>
                    <addr className="font-semibold">Addmition :</addr>{" "}
                    {student[0]?.is_admission_done ? "True" : "False"}
                  </p>
                </div>
              </div>
              <table className="w-full  border-collapse break-all mt-8">
                <thead>
                  <tr>
                    <th className="border border-black ">Number</th>
                    <th className="border border-black ">Amount</th>
                    <th className="border border-black ">Time</th>
                    <th className="border border-black ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {student[1]?.map((x, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-black pl-5 text-center">
                          {index}
                        </td>
                        <td className="border border-black pl-5 text-center ">
                          <pre className=" ">{x.amount} </pre>{" "}
                        </td>
                        <td className="border border-black pl-5 text-center">
                          {moment(x.time).format("MMMM Do YYYY")}
                        </td>
                        <td
                          className="border border-black pl-5 text-center bg-amber-500 text-white cursor-pointe hover:bg-red-500"
                          onClick={() => Remove(index)}
                        >
                          Delete
                        </td>
                      </tr>
                    );
                  })}
                  {
                    <tr>
                      <td className="font-semibold border border-black pl-5 text-center">
                        Total
                      </td>
                      <td className="border border-black pl-5 text-center font-semibold">
                        {total}
                      </td>
                      <td
                        className="border border-black pl-5 text-center uppercase"
                        id="wordtotal"
                      >
                        {toWords(Number(total))}
                      </td>
                      <td className="border border-black pl-5 text-center "></td>
                    </tr>
                  }
                </tbody>
              </table>
              <center className="mt-10">
                {/* <button className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `} onClick={MakePDF3}>
                        Save PDF
                       </button> */}
                {/* <Link to='1'>
                       <button onClick={PDf} className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `} >
                        Print
                       </button>
                       </Link> */}

                <button
                  onClick={handleDownload}
                  className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `}
                >
                  Save
                </button>
              </center>
            </div>
          )}
        </div>
      </div>
      <div className="relative hidden text-black font-serif" id="main">
        <div className="flex justify-center items-center  ">
          {/* <h1>Print</h1> */}
          <div
            className=" font-Rovoto  p-4 w-[793.70px] h-[1150px]  relative mb-7 "
            id="content"
          >
            <div className="flex justify-between items-center">
              <img src={logo} className="w-40 h-40"></img>
              {/* <img src={paid} className="w-40 h-40"></img> */}
              <div className="flex justify-center">
                <span className="font-bold text-2xl border-b-2 pb-2 border-black ">
                  Consignment
                </span>
              </div>

              <div className="text-[14px]">
                <p>
                  <addr className="font-bold">Consignment no : </addr>
                  {student && student[0]?.reg_id}.{moment().format("D")}{moment().format("MM")}
                </p>
                <p>
                  <addr className="font-bold ">Date : </addr>
                  <span className="font-medium text-gray-800">{moment().format("D-MMM-YYYY")}</span>
                  
                </p>
              </div>
            </div>
            {/* 2nd */}
            <div className="flex justify-between items-center text-[14px]">
              <article>
                <p>
                  <addr className="font-bold">Name : </addr>{" "}
                  {student && student[0]?.reg_fullname}
                </p>
                <p>
                  <addr className="font-bold">Email : </addr>
                  {student && student[0]?.reg_email}
                </p>
              </article>
              <article>
                <p>
                  <addr className="font-bold">Contact No : </addr>
                  {student && student[0]?.reg_mobile}
                </p>
                <p>
                  <addr className="font-bold">Installment : </addr>
                  {student && student[0]?.installment}
                </p>
              </article>
            </div>
            <table className="w-full  border-collapse break-all mt-2">
              <thead>
                <tr className="text-[14px]">
                  <th className="border border-black pb-2">Description</th>
                  <th className="border border-black pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {student &&
                  student[1].map((x, index) => {
                    return (
                      <tr key={index} className="text-[14px]">
                        <td className="border border-black pl-5 pb-2">
                          <pre className=" w-[300px] break-all">
                            ({moment(x.time).format("D-MMM-YYYY")}) -{" "}
                            {student && student[0]?.reg_course}
                          </pre>
                        </td>
                        <td className="border border-black pl-5 pb-2 ">
                          {x.amount}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* table End  */}
            <div className="flex justify-between text-[14px]">
              <p className="uppercase">
                <addr className="font-bold ">Amount In Words : </addr>
                {toWords(Number(total))} BDT
              </p>
              <p className="mr-10">
                <addr className="font-bold">Total : </addr>

                {total} BDT
              </p>
            </div>
            <div className="flex justify-center">
              <img src={paid} className="w-60 h-44" alt="paid"></img>
            </div>

            <div className="">
              <div className="term_condition ">
                <h2 className="font-bold text-[20px] mt-10">
                  Terms & Conditions:
                </h2>
                <p className="text-[14px]">
                  Admission for a course, together with the payment of the
                  dues/required deposit, constitutes an abiding agreement on the
                  student to follow the courses.
                </p>
                <ul className="mt-2 text-[14px]">
                  {/* <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px] "></FaCheckCircle>
                    </span>
                    The eligibility criteria for each course as set out in the
                    prospectus must be followed.
                  </li> */}
                  <li className="flex items-center  ">
                    <p className=" flex items-center justify-center mt-1 ">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </p>
                    <p className=" flex items-center justify-center mb-3">The eligibility criteria for each course as set out in the
                    prospectus must be followed.</p>
                    
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    All dues must be paid in full prior to commencement of the
                    course. If you do not complete your 2nd installment on time,
                    a 10% penalty  of the course fee will be applied to the due
                    amount.
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    The authority will not allow students to appear in the final
                    exams if their attendance in class is less than 75%. Absence
                    through illness must be supported by a medical certificate.
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    Behavior that puts other students and staff at risk or in a
                    harmful/dangerous situation will not be tolerated and
                    disciplinary procedures will be implemented.
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    By signing this you are bound to rules and regulation &
                    disciplinary code of conduct.
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    The authority has the right to alter the timetable,
                    location, number of classes, method of delivery, content,
                    Assessment and syllabus of your course, provided such
                    alterations are reasonable.
                  </li>
                  <li className="flex items-center">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    In the case of a batch transfer, students must submit a
                    transfer application and cover the 30% course fee charge
                    specifically designated for batch transfers.
                  </li>
                </ul>
              </div>
              <div className=" h-auto">
                <h2 className="font-bold text-[20px]  ">Refund policy:</h2>
                <ul className="mt-2 text-[14px]">
                  {/* <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px] "></FaCheckCircle>
                    </span>
                    Seat booking fee is non-refundable
                  </li> */}
                  <li className="flex items-center  ">
                    <p className=" flex items-center justify-center mt-1 ">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </p>
                    <p className=" flex items-center justify-center mb-3">Seat booking fee is non-refundable</p>
                    
                  </li>
                  <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    For refund eligibility you have to complete first two (2)
                    classes and submit homework within the given timeframe. No
                    fee will refund thereafter time has passed
                  </li>
                  {/* <li className="flex">
                    <span className=" flex items-center justify-center">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </span>
                    After completing first two classes you'll get 24 hours time
                    to apply for refund
                  </li> */}
                  <li className="flex items-center  ">
                    <p className=" flex items-center justify-center mt-1 ">
                      <FaCheckCircle className="mr-3 text-[12px]"></FaCheckCircle>
                    </p>
                    <p className=" flex items-center justify-center mb-3">After completing first two classes you'll get 24 hours time
                    to apply for refund</p>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employers;
