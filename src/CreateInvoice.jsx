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
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Payment } from "./store/Selary";
import NavBar from "./NavBar";
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
    const [atten, setAtten] = useState([]);
    const [id,setId] = useState(null);
    const[PaymentMethod,setPaymentMethod]=useState('Cash');
    const dispatch=useDispatch();

console.log(invoiceRow);
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
                setId(res.data.uid);
                setEmp(res.data)
                getAttenDanceInfo(res.data.uid)
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
function MakePDF3() {
        let totalAmount = earning;
        let TotalDeduct = deduct
        let NetSalary = Number(earning) - Number(deduct);
        let AmountInWords = toWords(Number(earning) - Number(deduct));
        let description = document.getElementById('description').value
        axios.post(ApiUrl.Invoice, { invoiceRow, totalAmount, TotalDeduct, NetSalary, AmountInWords, description, PaymentMethod, empId, month, year }).then((res) => {
        let newBase = ApiUrl.BaseUrl.substring(0, ApiUrl.BaseUrl.length - 1)
        const link = document.createElement('a');
        link.href = newBase+res.data;
        link.setAttribute('download', String(res.data).split('/').pop());
        link.click();
        // Cleanup
        link.remove();
        })
    }
const PDf=()=>{
  let totalAmount = earning;
        let TotalDeduct = deduct
        let NetSalary = Number(earning) - Number(deduct);
        let AmountInWords = toWords(Number(earning) - Number(deduct));
        let description = document.getElementById('description').value
  const data= { invoiceRow, totalAmount, TotalDeduct, NetSalary, AmountInWords, description, PaymentMethod, empId, month, year ,
    emp}
  dispatch(Payment(data))
 }
    useEffect(() => {
        getEmployee();
    }, [])

function Remove(index,amount){
  setEarning(Number(earning) - Number(amount))
  const updatedInvoiceRow = invoiceRow.filter((item, i) => i !== index);
  // setInvoiceRow([...invoiceRow]);
  setInvoiceRow(updatedInvoiceRow);
  

}
function getAttenDanceInfo(id) {
    axios
      .get(`${ApiUrl.AttendUrl}${id}/`)
      .then((res) => {
        const data = res.data;
        // console.log(data);
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
        // console.log(newAtten);
        setAtten(newAtten);
      })
      .catch((error) => console.log(error));
  }
    return (
      <>
        
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
            
        <div className="mx-20 flex flex-col justify-center items-center font-Rovoto" id="main-body" >

            <div className="mx-32 mb-6  w-[768px]  justify-items-center" >
                <Select options={emps} className="hover:bg-[#0891B2]" onChange={value => getSingleEmp(value)} />
            </div>
            {
                emp && <div >
                    <button className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg ${invoiceRow.length==0?'hidden':'block'}`} onClick={() => MakePDF3()}>
                        Save PDF
                    </button>
                    {/* <Link to='1'>
                  <button onClick={PDf} className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `} >
                  Print
                  </button>
                  </Link> */}
                </div>
            }
            <div className="flex w-full justify-center">
            {
                emp && 
                <div id="print" className=" mt-4 shadow-md p-4 w-[768px] h-[1056px] relative mb-7 ">
                    <div className="flex justify-between">
                    <div> <p><span className="font-semibold">Name: </span>{emp?.name} </p>
                    <p><span className="font-semibold">Designation: </span>{emp?.desig} </p>
                    </div>
                    <p className="text-end "><span className="font-semibold  ">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                    </div>
                    
                   
                    <div className="flex justify-center">
                        <div className="shadow-sm px-5 py-4 mt-3">
                            <p className="font-semibold text-center pb-3 text-[#0891B2]">Salary Of </p>
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
                                    <th className="border border-black ">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoiceRow?.map((x, index) => {
                                      // const displayIndex = index + 1; 
                                        return (
                                            <tr key={index }>
                                                <td className="border border-black pl-5">{x.title}</td>
                                                <td className="border border-black pl-5  "><pre className=" w-[300px] break-all">{x.desc} </pre> </td>
                                                <td className="border border-black pl-5">{x.amount}</td>
                                                <td className="border border-black pl-5">{x.status == 1 ? "Addition" : "Deduction"}</td>
                                                <td className="border border-black pl-5  " onClick={()=>
                                                   Remove(index,x.amount)}><button className="hover:bg-red-500 px-4 bg-amber-500  cursor-pointe py-1 rounded-lg text-white" onClick={()=>
                                                Remove(index,x.amount)}>delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    {
                                        year && month && <td onClick={() => props.setOpenModal('default')} className="  border border-black text-center bg-[#0891B2] text-white font-semibold hover:cursor-pointer hover:bg-lime-600" colSpan={5}>Add</td>
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
                                    <td className="border  border-black text-center uppercase ">{toWords(Number(earning) - Number(deduct))}</td>
                                </tr>
                            </table>
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
            <div className='  mt-4 shadow-md p-4 w-[768px] h-[1056px] overflow-y-scroll'>
                <h2 className="text-center text-[#0891B2] font-semibold">Details</h2>
                <div className=" md:p-5">
                <input type="checkbox" name="" id="" className="bg-red-400 mr-4" />
                <label>Holidays</label>
                </div>
                <div className=" md:p-5">
          <Table className="text-[12px] md:text-[16px] ">
            <Table.Head className="">
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Weekday</Table.HeadCell>
              <Table.HeadCell>Clock in</Table.HeadCell>
              <Table.HeadCell>Clock Out</Table.HeadCell>
            </Table.Head>
            <Table.Body className="">
           
              {atten?.map((x, index) => {
                // console.log(x);
                let isHoldiay =
                  moment(x.date).format("d") == 5 ||
                  moment(x.date).format("d") == 6 ;
                return (
                  <Table.Row
                    key={index}
                    className={`text-black border-4  bg-white border-white ${
                      isHoldiay ?" rounded-lg bg-red-400 ": 'odd:bg-[#f0f0f0] '
                    }`}
                  >
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
        </div>
        </>
    );
};

export default CreateInvoice;