import { Button, Table } from "flowbite-react";
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as xlsx from "xlsx";
import logo from "../src/images/logo(2).svg";
import head from "../src/images/head5.svg";
import footer from "../src/images/reverse.png";
import arena from "../src/images/sng1.png";
import tanjim from "../src/images/ta (3).png";
import qr from "../src/images/sc1.png";
import certificateIcon from "../src/images/vr.svg";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

// npm install xlsx

function Certificate() {
  const conponentPDF = useRef();
  const [excelData, setExcelData] = useState([]);
  const [pdfName, setPdfName] = useState("generated.pdf");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const url  = location.pathname;
  const readExcel = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(file);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    console.log(exceljson);
    setExcelData(exceljson);

    //  new
  };
  const generatePDF2 = useReactToPrint({
    content: () => conponentPDF.current,
    
  });
  const generatePDF = () => {
    const content = document.getElementById("content");
    html2canvas(content, { scale: 2, logging: false }).then(function (canvas) {
      // const cleanFileName = (student[0]?.reg_email + date).replace(
      //   /[^\w]/g,
      //   "_"
      // );
      const imgData = canvas.toDataURL("image/jpeg", 10); // Change format to JPEG and adjust quality to 0.7

      // Adjust the compression settings in the jsPDF constructor
      const pdf = new jsPDF({
        orientation: "landscape", // Set orientation to landscape for horizontal layout
        unit: "mm",
        format: "a4",
        compress: true, // Enable compression
        precision: 8, // Set the precision for compression
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 297, 210); // Use A4 dimensions in landscape mode (adjust as needed)
      // pdf.save({name});
      document.getElementById("main").style.display = "none";
    });
  };
  const handleDownload = () => {
    generatePDF(pdfName);
  };
  const Views =async(Name, id, Course, newDate) => {
    console.log(Name);
     setName(Name);
     setId(id);
     setCourse(Course);
     setDate(newDate);
    // document.getElementById("table").style.display = "none";
    // document.getElementById("dwn").style.display = "block";
    // document.getElementById("back").style.display = "block";
    
    setTimeout(()=>{
      document.getElementById("content").style.display = "block";
      generatePDF2();
          document.getElementById("content").style.display= "none";
    },50)
    
      
   


  };

  return (
    <React.Fragment>
      <div className="">
        <div className="row fthight">
          <div className="col-md-4 ">
            <h3 className="mt-3">Fetch Excel Data in React js</h3>
            <label className="form-label">File </label>zx
            <input
              type="file"
              className="form-control"
              onChange={(e) => readExcel(e)}
            />
          </div>

          <div className="m-10  w-full" id="table">
            {excelData.length > 1 && (
              <div className="w-[80%] mx-auto ">
              <table className="w-[100%]  mx-auto bg-slate-50 ">
                <thead >
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody >
                  {excelData.map((getdata, index) => (
                    <tr key={index} className="odd:bg-slate-100 ">
                      <td className="text-center">{index + 1}</td>
                      <td className="ml-20 text-center">{getdata.Name} </td>
                      <td className="text-center">{getdata.Email} </td>
                      <td className="text-center">{getdata.Course} </td>
                      <td className="text-center">{getdata.Date} </td>

                      <td className="text-center" >{getdata.id} </td>
                     
                      <td className="text-center">
                        <button
                          className="bg-green-400 text-white px-6 py-1 cursor-pointer rounded-md"
                          onClick={() =>
                            Views(
                              getdata.Name,
                              getdata.id,
                              getdata.Course,
                              getdata.Date
                            )
                          }
                        >
                         Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-10">
        {/* <Button onClick={Back} id="back" className="hidden">
          Back
        </Button>
        <Button onClick={generatePDF2} id="dwn" className="hidden ml-10">
          PDF
        </Button> */}
      </div>
      <div className="flex justify-center mb-11 ">
        <div
          className=" w-[100%] h-[793.56px]  border-[10px]  border-[#73449B] relative  p-3 hidden"
          id="content"
          ref={conponentPDF}
        >
          <div className=" relative  bg-white h-full border-t-[10px] border-b-[10px] border-l-[3px] border-r-[3px]   border-[#49C7EC]">
            <div
              className="mt-1
                 flex absolute top-0 right-6"
            >
              <img alt="head" src={head} className="w-[340px] h-54 " />
            </div>
            <div className="float-left flex h-full">
              <p className="h-full w-[3px] bg-[#49C7EC] ml-2 z-20"></p>
              <p className="h-full w-[3px] bg-[#49C7EC] ml-2 z-20"></p>
            </div>

            <div className="float-right flex h-full">
              <p className="h-full w-[3px] bg-[#49C7EC] mr-2"></p>
              <p className="h-full w-[3px] bg-[#49C7EC] mr-2"></p>
            </div>
            <div className="mt-14 flex justify-center">
              <img alt="logo" src={logo} className="w-60 h-20 " />
            </div>

            <div className="flex justify-center flex-col certificate ">
              <div className="relative">
                <h1 className="text-[#73449B] font-bold text-[50px] text-center leading-[45px] ">
                  CERTIFICATE <br></br>OF APPRECIATION
                </h1>
                <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-[60px] mt-1 left-[200px] top-5 absolute"></p>
                <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-[60px] mt-1 right-[200px] top-5 absolute"></p>
              </div>
              <div>
                <p className="tracking-widest font-[650] text-center mt-20">
                  THIS CERTIFICATE IS AWARDED TO
                </p>
                <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1"></p>
              </div>
              <div>
                <h1 className="text-[#73449B] font-bold text-[50px] text-center leading-[45px] mt-3 font-comforta ">
                  {name}
                </h1>
                <p className=" font-medium text-center mt-2  leading-0 font-Plyafire ">
                  In acknowledgment of the successful completion of the{" "}
                  <span className="font-bold">{course}</span> program.
                </p>
              </div>
            </div>
            <div className="w-3/5 mx-auto mt-28 flex justify-between z-50 relative ">
              <div className="border-[2px]  border-[#73449B] py-1 px-3  w-2/6 flex justify-center items-center flex-col ">
                <div className="flex justify-center items-center ">
                  <img
                    alt="arena"
                    src={arena}
                    className="h-10 w-24 border-1 "
                  />
                </div>
                <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1 "></p>
                <div>
                  <h3 className="text-[#73449B] text-[18px] font-semibold mt-4 leading-3">
                    {date}
                  </h3>
                  <p className="text-[12px] font-medium mt-1 text-center">
                    issued
                  </p>
                </div>
              </div>
              <div className=" py-1    mt-[-50px] w-4/6">
                <div className=" ">
                  <div className="flex justify-center items-center ">
                    <img alt="arena" src={tanjim} className="h-7 w-36" />
                  </div>
                  <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-3/5 mx-auto mt-1"></p>
                </div>
                <div>
                  <h3 className="text-[#73449B] text-[18px] font-medium leading-5 text-center">
                    TANJIM AL FAHIM
                  </h3>
                  <p className="text-center leading-5 font-Plyafire">CEO</p>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    alt="arena"
                    src={qr}
                    className="h-[5rem] w-[5rem] mt-2"
                  />
                </div>
              </div>

              <div className="border-[2px]  border-[#73449B] py-0 px-1 relative w-2/6 ">
                <div>
                  <div className="flex justify-center items-center bg-white ">
                    <img
                      alt="arena"
                      src={certificateIcon}
                      className="h-24 w-18 mt-[-30px] bg-white"
                    />
                  </div>
                  <p className="h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1"></p>
                </div>
                <div>
                  <h3 className="text-[#73449B] text-[18px] font-semibold text-center mt-1 leading-3">
                    {id}
                  </h3>
                  <p className="text-[12px] font-medium text-center mt-1">
                    Verification No.
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex absolute bottom-0 left-6 ">
              <img alt="head" src={footer} className="w-48 h-48  " />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Certificate;
