import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import ApiUrl from "./ApiUrl";
import moment from "moment";
import { Select as FlowbiteSelect, TextInput, Modal, Button } from 'flowbite-react';
import { toWords } from 'number-to-words'
import InsideModal from "./InsideModal";

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
    const [year, setYear] = useState(null)
    const months = new Array(12)
    const [openModal, setOpenModal] = useState(null);
    const [invoiceRow, setInvoiceRow] = useState([])
    const props = { openModal, setOpenModal };
    const [earning, setEarning] = useState(0)
    const [deduct, setDeduct] = useState(0)
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
    // function MakePDF() { // TODO it has its own problem. but worked
    //     let disturb = document.getElementById('disturb');
    //     let temp = disturb.innerHTML;
    //     if (year != null) {
    //         if (month != null) {
    //             disturb.innerHTML = `<span style="margin-right:10px">${moment().month(month - 1).format('MMMM')}</span><span>${year}</span>`
    //         }
    //     }
    //     toPDF()
    //     disturb.innerHTML = temp
    // }
    function MakePDF2() { //WORKED FLAWLESSLY
        let element = document.getElementById('print')
        let opt = {
            filename: `${emp.name}.pdf`,
        }
        html2pdf().set(opt).from(element).save(); // ignore the error. cdn covering for it. browser will not make hassel about this

    }


    useEffect(() => {
        getEmployee();
        // let script=document.createElement('script');
        // script.type = 'application/javascript';
        // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        // script.src = './html2pdf.bundle.min.js';
        // document.head.appendChild(script);

    }, [])
    return (
        <div className="mx-20 flex flex-col justify-center items-center" >
            <div className="mx-32 mb-6 w-[90%] justify-items-center" >
                <Select options={emps} onChange={value => getSingleEmp(value)} />
            </div>
            <Button onClick={() => props.setOpenModal('default')}>HUUH</Button>
            {
                emp && <div>
                    <Button color="success" onClick={() => MakePDF2()}>
                        Save PDF
                    </Button>
                </div>
            }

            {
                emp && <div id="print" className=" mt-4 border border-black p-4 w-[768px] h-[1056px] relative mb-7 ">
                    <p className="text-end "><span className="font-bold">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                    <p><span className="font-bold">Name: </span>{emp?.name} </p>
                    <p><span className="font-bold">Designation: </span>{emp?.desig} </p>
                    <div className="flex justify-center">
                        <div className="border border-black px-2 py-3 mt-3">
                            <span className="font-semibold">Salary of: </span>
                            {/* <Select className="inline-block w-40" options={months} /> */}
                            <div
                                className="max-w-md inline-flex"
                                id='disturb'
                            >
                                <FlowbiteSelect
                                    id="select"
                                    required
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
                                    onChange={value => setYear(value.target.value)}
                                    type="number"
                                    className="ml-1"
                                />
                            </div>


                        </div>

                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full  border-collapse">
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
                                                <td className="border border-black ">{x.title}</td>
                                                <td className="border border-black "><pre>{x.desc} </pre> </td>
                                                <td className="border border-black ">{x.amount}</td>
                                                <td className="border border-black ">{x.status == 1 ? "Addition" : "Deduction"}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    {
                                        year && month && <td onClick={() => props.setOpenModal('default')} className="  border border-black text-center text-black font-bold hover:cursor-pointer hover:bg-slate-950/10" colSpan={4}>Add</td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4 w-1/2 mx-auto" >
                            <table className=" w-full">
                                <tr>
                                    <td className="font-semibold border border-black w-1/2">Total Earning</td>
                                    <td className="border  border-black ">{earning}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold border border-black">Total Deduct</td>
                                    <td className="border  border-black ">{deduct}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold border  border-black">Net Salary</td>
                                    <td className="border  border-black ">{Number(earning) - Number(deduct)}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold border  border-black">Amount In Words</td>
                                    <td className="border  border-black ">{toWords(Number(earning) - Number(deduct))}</td>
                                </tr>
                            </table>
                            {/* <p><span className="font-semibold">Total Earning:</span>{earning}</p>
                            <p><span className="font-semibold">Total Deduct:</span>{deduct}</p>
                            <p><span className="font-semibold">Net Salary:</span>{Number(earning) - Number(deduct)}</p>
                            <p><span className="font-semibold">Amount In Words:</span>{toWords(Number(earning) - Number(deduct))}</p> */}
                        </div>

                        <Modal show={props.openModal === 'default'} onClose={() => setOpenModal(undefined)} size="7xl">
                            <Modal.Body>

                                <InsideModal year={year} month={month} id={emp.uid} addRow={addRow} setOpenModal={setOpenModal}></InsideModal>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                                    Decline
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <div className="overline decoration-dotted w-full flex justify-between absolute bottom-[.8in] left-0 p-3">
                        <span>Employee Signature</span>
                        <span>Authority Signature</span>
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