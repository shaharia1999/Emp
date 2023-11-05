import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import ApiUrl from "./ApiUrl";
import moment from "moment";
import { Select as FlowbiteSelect, TextInput, Modal, Button, Textarea } from 'flowbite-react';
import { toWords } from 'number-to-words'
import InsideModal from "./InsideModal";
import {Timeline } from 'flowbite-react';

import {HiLocationMarker} from 'react-icons/hi';
import {AiFillPhone, AiTwotoneMail} from 'react-icons/ai';


// import { usePDF } from 'react-to-pdf'; // it has family issues
// import html2pdf from 'html2pdf.js' // it raise the same problem
// https://html2canvas.hertzen.com/features/
// read this then manually design this
//
//
const CreateInvoice = () => {
    const [emps, setEmps] = useState([])
    const [emp, setEmp] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(moment().format("YYYY"))
    const months = new Array(12)
    const [openModal, setOpenModal] = useState(null);
    const [invoiceRow, setInvoiceRow] = useState([])
    const props = { openModal, setOpenModal };
    const [earning, setEarning] = useState(0)
    const [deduct, setDeduct] = useState(0);
    const[empId,setEmpId]=useState(null);
    const[PaymentMethod,setPaymentMethod]=useState('Cash');
    console.log(PaymentMethod);
    // const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' }); // uncomment when you found the solution, assign targetRef to the desire element

    for (let index = 0; index < 12; index++) {
        let t = { 'label': moment().month(index).format('MMMM'), 'value': index + 1 }
        months.push(t)
    }

    function getEmployee() {
        axios.get(ApiUrl.GetEmployees).then(res => {
            console.log(res.data);
            setEmps(res.data)
        }).catch(error => console.log(error))
    }
    function getSingleEmp(value) {
        setEmpId(value.value);
        setEarning(0)
        setInvoiceRow([])
        if (value != null) {
            axios.get(ApiUrl.GetEmployee + `${value.value}/`).then(res => {
                setEmp(res.data)
            })
        }
    }
    function addRow(newRow) {
        if (invoiceRow != null) {
            setInvoiceRow([...invoiceRow, newRow])
            if (newRow.status == 1) {
                setEarning(Number(earning) + Number(newRow.amount))
            } else if (newRow.status == 2) {
                setDeduct(Number(deduct) + Number(newRow.amount))
            }
        } else {
            if (newRow.status == 1) {
                setEarning(newRow.amount)
            } else if (newRow.status == 2) {
                setDeduct(newRow.amount)
            }
            setInvoiceRow([newRow])
        }
    }
    function saveBlob(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        // Cleanup
        link.remove();
        window.URL.revokeObjectURL(url);
      }

    function MakePDF3() {
    let totalAmount=earning;
    let TotalDeduct=deduct
    let NetSalary=Number(earning) - Number(deduct);
    let AmountInWords=toWords(Number(earning) - Number(deduct));
    let description=document.getElementById('description').value
    console.log(description);
    console.log(totalAmount,TotalDeduct,NetSalary,AmountInWords,empId);
    axios.post(ApiUrl.Invoice,{invoiceRow,totalAmount,TotalDeduct,NetSalary,AmountInWords,description,PaymentMethod,empId,month,year}).then((res)=>{
        const contentDisposition = res.headers['content-disposition'];
        const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"$/);
        if (filenameMatch) {
            const filename = filenameMatch[1];
            saveBlob(res.data, filename);
          } else {
            saveBlob(res.data, 'your_file_name.pdf');
          }
    })
    }

    useEffect(() => {
        getEmployee();
    }, [])

    return (
        <div className="mx-20 flex flex-col justify-center items-center font-Rovoto" id="main-body" >

            <div className="mx-32 mb-6  w-[768px]  justify-items-center" >
                <Select options={emps} className="hover:bg-[#0891B2]" onChange={value => getSingleEmp(value)} />
            </div>
            {/* <Button onClick={() => props.setOpenModal('default')}>HUUH</Button> */}
            {
                emp && <div>
                    <button className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg ${invoiceRow.length==0?'hidden':'block'}`} onClick={() => MakePDF3()}>
                        Save PDF
                    </button>
                </div>
            }

            {
                emp && <div id="print" className=" mt-4 shadow-md p-4 w-[768px] h-[1056px] relative mb-7 ">
                    <div className="flex justify-between">
                    <div> <p><span className="font-semibold">Name: </span>{emp?.name} </p>
                    <p><span className="font-semibold">Designation: </span>{emp?.desig} </p>
                    </div>
                    <p className="text-end "><span className="font-semibold  ">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                    </div>
                    
                   
                    <div className="flex justify-center">
                        <div className="shadow-sm px-5 py-4 mt-3">
                            <p className="font-semibold text-center pb-3 text-[#0891B2]">Salary Of </p>
                            {/* <Select className="inline-block w-40" options={months} /> */}
                            <div
                                className="max-w-md inline-flex"
                                id='disturb'
                            >
                                <FlowbiteSelect
                                    id="select"
                                    required
                                    className="w-1/2"
                                    onChange={value => setMonth(value.target.value)}

                                >
                                    <option>Select Month</option>
                                    {
                                        months?.map((x, index) => {
                                            return (
                                                <option key={index} value={x.value}>
                                                    {x.label}
                                                </option>
                                            )
                                        })
                                    }
                                </FlowbiteSelect>
                                <TextInput
                                    id="year"
                                    placeholder="Year..."
                                    required
                                    defaultValue={year}
                                    maxLength={4}
                                    onChange={value => setYear(value.target.value)}
                                    type="number"
                                    className="ml-1"
                                />
                            </div>


                        </div>

                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full  border-collapse break-all">
                            <thead>
                                <tr>
                                    <th className="border border-black ">Title</th>
                                    <th className="border border-black ">Description</th>
                                    <th className="border border-black ">Amount</th>
                                    <th className="border border-black ">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoiceRow?.map((x, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="border border-black pl-5">{x.title}</td>
                                                <td className="border border-black pl-5  "><pre className=" w-[300px] break-all">{x.desc} </pre> </td>
                                                <td className="border border-black pl-5">{x.amount}</td>
                                                <td className="border border-black pl-5">{x.status == 1 ? "Addition" : "Deduction"}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    {
                                        year && month && <td onClick={() => props.setOpenModal('default')} className="  border border-black text-center bg-[#0891B2] text-white font-semibold hover:cursor-pointer hover:bg-lime-600" colSpan={4}>Add</td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4  mx-auto" >
                            <table className=" w-full">
                                <tr>
                                    <td className=" border border-black w-1/2 pl-5">Total Earning</td>
                                    <td className="border  border-black text-center " id='earning'>{earning}</td>
                                </tr>
                                <tr>
                                    <td className=" border border-black pl-5">Total Deduct</td>
                                    <td className="border  border-black text-center">{deduct}</td>
                                </tr>
                                <tr>
                                    <td className=" border  border-black pl-5">Net Salary</td>
                                    <td className="border  border-black text-center">{Number(earning) - Number(deduct)}</td>
                                </tr>
                                <tr>
                                    <td className=" border  border-black pl-5">Amount In Words</td>
                                    <td className="border  border-black text-center ">{toWords(Number(earning) - Number(deduct))}</td>
                                </tr>
                            </table>
                            {/* <p><span className="font-semibold">Total Earning:</span>{earning}</p>
                            <p><span className="font-semibold">Total Deduct:</span>{deduct}</p>
                            <p><span className="font-semibold">Net Salary:</span>{Number(earning) - Number(deduct)}</p>
                            <p><span className="font-semibold">Amount In Words:</span>{toWords(Number(earning) - Number(deduct))}</p> */}
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between">
                            <p>*Amount Paid through</p>
                            <FlowbiteSelect className="w-2/5 font-semibold" id='paymetmethod' onChange={(value)=>setPaymentMethod(value.target.value)}>
                                <option value='cash'>Cash</option>
                                <option value='bank'>Bank</option>
                                <option value='nogod'>Nogod</option>
                                <option value='bkash'>Bkash</option>
                                <option value='other'>Other</option>
                            </FlowbiteSelect>
                            </div>
                           
                        </div>
                        <div className="mt-2">
                            <Textarea rows={4} id='description'>
                            </Textarea>
                        </div>

                        <Modal show={props.openModal === 'default'} onClose={() => setOpenModal(undefined)} size="7xl">
                            <Modal.Body>

                                <InsideModal p year={year} month={month} id={emp.uid} addRow={addRow} setOpenModal={setOpenModal}></InsideModal>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                    Decline
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

  


                    <div className="  absolute bottom-0 left-0 right-0 p-3" >
                        <div className="w-full flex justify-between mb-3">
                        <span className=" leading-8 border-t-4 border-dotted border-black ">Employee Signature</span>
                        <span className="leading-8 border-t-4 border-dotted border-black ">Authority Signature</span>
                        </div>
                       
                        <Timeline horizontal className=" text-black ">
      <Timeline.Item className=" w-1/3 ">
        {/* <Timeline.Point icon={HiCalendar}  /> */}
        <div className="relative h-1 bg-[#69D4DD]">
        <HiLocationMarker className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full"/>
        </div>
        <Timeline.Content>
          
          <Timeline.Body className="text-center text-black">
            House No-1,Block-B,Banasree,<br/>
            Main Road,Rampura,Dhaka-1219
          </Timeline.Body>
         
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item className=" w-1/3 ">
        {/* <Timeline.Point icon={HiCalendar} /> */}
        <div className="relative h-1 bg-[#69D4DD]">
        <AiTwotoneMail className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full"/>
        </div>
        <Timeline.Content>
          
          <Timeline.Body className="text-black text-center">
             www.arenawebsecurity.net<br/>
             support@arenawebsecurity.net
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item className=" w-1/3 ">
        {/* <Timeline.Point icon={HiCalendar} /> */}
          <div className="relative h-1 bg-[#69D4DD]">
        <AiFillPhone className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#69D4DD] rounded-full"/>
        </div>
        <Timeline.Content>

          <Timeline.Body className="text-black text-right">
            +8800188663989<br/>
            +8801779224640
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
                    </div>
                </div>


            }
            {/* <Modal show={props.openModal === 'default'} onClose={() => setOpenModal(undefined)} size="7xl">
                <Modal.Body>

                    <InsideModal year={2023} month={10} id={'2a39c802-b27d-467b-a165-e184417dba33'} addRow={addRow} setOpenModal={setOpenModal}></InsideModal>

                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal> */}

        </div>
    );
};

export default CreateInvoice;