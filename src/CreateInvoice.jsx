import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import ApiUrl from "./ApiUrl";
import moment from "moment";
import { Select as FlowbiteSelect, TextInput, Modal, Button } from 'flowbite-react';
import { toWords } from 'number-to-words'
import InsideModal from "./InsideModal";
import { usePDF } from 'react-to-pdf';


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
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
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
    useEffect(() => {
        getEmployee();
    }, [])
    return (
        <div className="mx-20 flex flex-col justify-center items-center">
            <div className="mx-32 mb-6 w-[90%]">
                <Select options={emps} onChange={value => getSingleEmp(value)} />
            </div>
            {
                emp && <div>
                    <Button color="success" onClick={() => toPDF()}>
                        Save PDF
                    </Button>
                </div>
            }

            {
                emp && <div id="print" ref={targetRef} className=" mt-4 border border-black p-4 w-[8.3in] h-[11.7in] relative mb-7 ">
                    <p className="text-end mt-[1.2in]"><span className="font-bold">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                    <p><span className="font-bold">Name: </span>{emp?.name} </p>
                    <p><span className="font-bold">Designation: </span>{emp?.desig} </p>
                    <div className="flex justify-center">
                        <div className="border border-black px-2 py-3 mt-3">
                            <span>Salary of: </span>
                            {/* <Select className="inline-block w-40" options={months} /> */}
                            <div
                                className="max-w-md inline-block"
                                id="select"
                            >
                                <FlowbiteSelect
                                    id="countries"
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
                            </div>
                            <TextInput
                                id="email1"
                                placeholder="Year..."
                                required
                                onChange={value => setYear(value.target.value)}
                                type="number"
                                className="inline-block ml-1"
                            />

                        </div>

                    </div>
                    <div className="w-full mt-6">
                        <table className="w-full  border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black pb-2">Title</th>
                                    <th className="border border-black pb-2">Description</th>
                                    <th className="border border-black pb-2">Amount</th>
                                    <th className="border border-black pb-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoiceRow?.map((x, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="border border-black pb-2">{x.title}</td>
                                                <td className="border border-black pb-2">{x.desc}</td>
                                                <td className="border border-black pb-2">{x.amount}</td>
                                                <td className="border border-black pb-2">{x.status}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    {
                                        year && month && <td onClick={() => props.setOpenModal('default')} className=" pb-2 border border-black text-center text-black font-bold hover:cursor-pointer hover:bg-slate-950/10" colSpan={4}>Add</td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4">
                            <table>
                                <tr>
                                    <td className="font-semibold ">Total Earning</td>
                                    <td className="font-semibold  "> : </td>
                                    <td >{earning}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold ">Total Deduct</td>
                                    <td className="font-semibold "> : </td>
                                    <td >{deduct}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold ">Net Salary</td>
                                    <td className="font-semibold "> : </td>
                                    <td >{Number(earning) - Number(deduct)}</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold ">Amount In Words</td>
                                    <td className="font-semibold ">:</td>
                                    <td >{toWords(Number(earning) - Number(deduct))}</td>
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
            {
                // <div id="print" className="border p-4">
                //     <p className="text-end"><span className="font-bold">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                //     <p><span className="font-bold">Name: </span>{emp?.name} </p>
                //     <p><span className="font-bold">Designation: </span>{emp?.desig} </p>
                //     <div className="flex justify-center">
                //         <div className="border border-black px-2 py-3 mt-3">
                //             <span>Salary of: </span>
                //             {/* <Select className="inline-block w-40" options={months} /> */}
                //             <div
                //                 className="max-w-md inline-block"
                //                 id="select"
                //             >
                //                 <FlowbiteSelect
                //                     id="countries"
                //                     required
                //                     onChange={value => setMonth(value)}
                //                 >
                //                     {
                //                         months?.map((x, index) => {
                //                             return (
                //                                 <option key={index} value={x.value}>
                //                                     {x.label}
                //                                 </option>
                //                             )
                //                         })
                //                     }
                //                 </FlowbiteSelect>
                //             </div>
                //             <TextInput
                //                 id="email1"
                //                 placeholder="Year..."
                //                 required
                //                 onChange={value=>setYear(value)}
                //                 type="number"
                //                 className="inline-block ml-1"
                //             />

                //         </div>

                //     </div>
                //     <div className="w-full px-7 mt-6">
                //         <table className="w-full  border-collapse">
                //             <thead>
                //                 <tr>
                //                     <th className="border border-black">Title</th>
                //                     <th className="border border-black">Description</th>
                //                     <th className="border border-black">Amount</th>
                //                     <th className="border border-black">Status</th>
                //                 </tr>
                //             </thead>
                //             <tbody>
                //                 <td onClick={() => props.setOpenModal('default')} className="border border-black text-center text-black font-bold hover:cursor-pointer hover:bg-slate-950/10" colSpan={4}>Add</td>
                //             </tbody>
                //         </table>

                //         <Modal show={props.openModal === 'default'} onClose={() => setOpenModal(undefined)} size="7xl">
                //             <Modal.Body>
                //                 <InsideModal year={year} month={month}  ></InsideModal>
                //             </Modal.Body>
                //             <Modal.Footer>
                //                 <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
                //                 <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                //                     Decline
                //                 </Button>
                //             </Modal.Footer>
                //         </Modal>
                //     </div>
                //     <div className="overline decoration-dotted flex justify-between p-3 mt-10">
                //         <span>Employee Signature</span>
                //         <span>Authority Signature</span>
                //     </div>
                // </div>
            }
        </div>
    );
};

export default CreateInvoice;