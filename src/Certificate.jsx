import { Button, Table } from "flowbite-react";
import React, { useState,useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import *as xlsx from 'xlsx';
import logo from '../src/images/logo (2).png'
import head from '../src/images/head.png'
import footer from '../src/images/fo.png'
import arena from '../src/images/sng.png'
import tanjim from '../src/images/ta.png'
import qr from '../src/images/sc.png'
import certificateIcon from '../src/images/ti.png'
import moment from "moment";
import { useReactToPrint } from "react-to-print";


// npm install xlsx

function Certificate() 
{
  const conponentPDF= useRef();
   const [excelData, setExcelData]= useState([]);
   const [pdfName, setPdfName] = useState("generated.pdf");
   const [name,setName]=useState('')
   const [id,setId]=useState('')
  const readExcel = async(e)=>{
   const file= e.target.files[0];
   const data= await file.arrayBuffer(file);
   const excelfile= xlsx.read(data);
   const excelsheet= excelfile.Sheets[excelfile.SheetNames[0]];
   const exceljson= xlsx.utils.sheet_to_json(excelsheet);
   setExcelData(exceljson);

  //  new   
 


  }
  const generatePDF2= useReactToPrint({
    content: ()=>conponentPDF.current,
    documentTitle:"Userdata",
    onAfterPrint:()=>alert("Data saved in PDF")
});
const generatePDF = () => {
    const content = document.getElementById('content');
    html2canvas(content, { scale: 2, logging: false }).then(function (canvas) {
      // const cleanFileName = (student[0]?.reg_email + date).replace(
      //   /[^\w]/g,
      //   "_"
      // );
      const imgData = canvas.toDataURL('image/jpeg', 10); // Change format to JPEG and adjust quality to 0.7
  
      // Adjust the compression settings in the jsPDF constructor
      const pdf = new jsPDF({
        orientation: 'landscape', // Set orientation to landscape for horizontal layout
        unit: 'mm',
        format: 'a4',
        compress: true, // Enable compression
        precision: 8, // Set the precision for compression
      });
  
      pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210); // Use A4 dimensions in landscape mode (adjust as needed)
      pdf.save('shaharia');
      document.getElementById('main').style.display = 'none';
    });
  };
  const handleDownload = () => {
    // document.getElementById("main").style.display = "block";

      generatePDF(pdfName);

  };
  const Views=(Name,id)=>{
    console.log(Name,id);
    setName(Name)
    setId(id)
    document.getElementById('table').style.display = "none"
    document.getElementById('dwn').style.display = "block"
    document.getElementById('back').style.display = "block"
    document.getElementById('content').style.display = "block"
    
  }
  const Back=()=>{
    
    document.getElementById('table').style.display = "block"
    document.getElementById('dwn').style.display = "none"
    document.getElementById('back').style.display = "none"
    document.getElementById('content').style.display = "none"
    
  }
    return(
        <React.Fragment>
              <div className="content">
               <div className="row fthight">               
               <div className="col-md-4 ">
               <h3 className='mt-3'>Fetch Excel Data in React js</h3>
               <label className="form-label">File </label>
               <input type="file" className="form-control" onChange={ (e)=>readExcel(e)}  />
               </div>
              
               <div className=" " id='table'>   
               {   excelData.length > 1 && (
                <Table className="">
                  <thead>
                     <tr>
                        <th>Sr. No</th>
                        <th>Email</th>
                        <th>id</th>
                        <th>Name</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                    {                     
                    excelData.map( (getdata, index)=>(
                     <tr key={index}>
                        <td>{ index+1 }</td>
                        <td>{ getdata.__EMPTY} </td>
                        <td>{ getdata.__EMPTY_1} </td>
                        <td className="ml-20">{ getdata['AWS B-46 Corporate Intern']} </td>
                       <td ><button className="bg-green-400 text-white px-6 py-1 cursor-pointer rounded-md" onClick={()=>Views(getdata['AWS B-46 Corporate Intern'],getdata.__EMPTY_1)}>View</button></td>
                     </tr>
                     ) ) }
                  </tbody>
                </Table>
               )
}

               </div>
               </div>
             </div>
             <div className="flex justify-center mb-10">
             <Button onClick={Back} id='back' className="hidden">Back</Button>
             <Button onClick={handleDownload} id='dwn' className="hidden ml-10">Download</Button>
             <button className="btn btn-success" onClick={ generatePDF2}>PDF</button> 
           
             </div>
             <div className="flex justify-center mb-11 ">
             
             <div className=" w-[100%] h-[793.56px]  border-[10px]  border-[#73449B] relative  p-3 hidden"   id="content" ref={conponentPDF} >
             
                <div className=" relative  bg-white h-full border-t-[10px] border-b-[10px] border-l-[3px] border-r-[3px]   border-[#49C7EC]">
                <div className="mt-1
                 flex absolute top-0 right-6">
                        <img alt="head" src={head} className="w-[380px] h-48 "  />
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
                        <img alt="logo" src={logo} className="w-48 h-20 "  />
                    </div>
                    
                   
                    <div className="flex justify-center flex-col certificate ">
                        <div>
                            <h1 className="text-[#73449B] font-bold text-[50px] text-center leading-[45px]" >CERTIFICATE <br></br>OF APPRECIATION</h1>
                        </div>
                        <div>
                            <p className="tracking-widest font-semibold text-center mt-8">THIS CERTIFICATE IS AWARDED TO</p>
                            {/* <hr className='h-[1.5px] bg-[#49C7EC] w-3/4 justify-center mx-auto mt-2' /> */}
                            <p className='h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1'></p>
                        </div>
                        <div>
                        <h1 className="text-[#73449B] font-bold text-[50px] text-center">{name}</h1>
                        <p className=" font-medium text-center mt-8 uppercase">In recognition of the successful completion of the <span className="font-bold">Cyber Security</span></p>
                        </div>

                    </div>
                    <div className="w-3/5 mx-auto mt-32 flex justify-between z-50 relative ">
                        <div className="border-[2px]  border-[#73449B] py-1 px-3  w-1/4 flex justify-center items-center flex-col h-28">
                            <div className="flex justify-center items-center ">
                            <img alt="arena" src={arena} className="h-10 w-24 border-1 "/>
                          
                            </div>
                            <p className='h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1 '></p>
                            <div>
                                <h3 className="text-[#73449B] text-[14px] font-medium">{moment().format("D-MMM-YYYY")}</h3>
                            </div>
                        </div>
                        <div className=" py-1 px-3">
                            <div className=" ">
                                <div className="flex justify-center items-center ">
                            <img alt="arena" src={tanjim} className="h-10 w-24"/>
                            </div>
                            {/* <hr className='h-[2px] bg-[#49C7EC] w-4/4 justify-center mx-auto' /> */}
                            <p className='h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1'></p>
                            </div>
                            <div>
                                <h3 className="text-[#73449B] text-[18px] font-medium">TANJIM AL FAHIM</h3>
                            </div>
                            <div className="flex justify-center items-center">
                            <img alt="arena" src={qr} className="h-8 w-8 mt-2"/>
                            </div>
                        </div>
                        
                        <div className="border-[2px]  border-[#73449B] py-0 px-1 relative w-1/4 h-28">
                            <div >
                                <div className="flex justify-center items-center ">
                                <img alt="arena" src={certificateIcon} className="h-24 w-18 mt-[-30px]"/>
                                </div>
                           
                            {/* <hr className='h-[2px] bg-[#49C7EC] w-4/4 justify-center mx-auto' /> */}
                            <p className='h-[1.5px] bg-[#49C7EC]  justify-center w-full mt-1'></p>
                            </div>
                            <div>
                                <h3 className="text-[#73449B] text-[14px] font-medium text-center">{id}</h3>
                            </div>
                        </div>
                        
                     
                    </div>
                    <div className=" flex absolute bottom-0 left-6 ">
                        <img alt="head" src={footer} className="w-48 h-48  "  />
                    </div>
                </div>
                
             </div>
             </div>
        </React.Fragment>
    );
}
export default Certificate;