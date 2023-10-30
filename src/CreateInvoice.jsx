import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import ApiUrl from "./ApiUrl";
import moment from "moment";
const CreateInvoice = () => {
    const [emps, setEmps] = useState([])
    const [emp, setEmp] = useState(null)
    const months = new Array(12)
    for (let index = 0; index < 12; index++) {
        let t = { 'label': moment().month(index).format('MMMM'), 'value': index }
        months.push(t)
    }
    function getEmployee() {
        axios.get(ApiUrl.GetEmployees).then(res => {
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
    useEffect(() => {
        getEmployee();
    }, [])
    return (
        <div className="mx-20">
            <div className="mx-32 mb-6">
                <Select options={emps} onChange={value => getSingleEmp(value)} />
            </div>
            <div id="print" className="border p-4">
                <p className="text-end"><span className="font-bold">Date: </span>{moment().format("dddd, MMM Do YYYY")}</p>
                <p><span className="font-bold">Name: </span>{emp?.name} </p>
                <p><span className="font-bold">Designation: </span>{emp?.desig} </p>
                <div className="flex justify-center">
                    <div className="border border-black px-2 py-3 mt-3">
                        <span>Salary of: </span>
                        <Select className="inline-block w-40" options={months} />
                    </div>

                </div>
                <div className="w-full px-7 mt-6">
                    <table className="w-full  border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-black">Title</th>
                                <th className="border border-black">Description</th>
                                <th className="border border-black">Amount</th>
                                <th className="border border-black">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td className="border border-black text-center text-black font-bold hover:cursor-pointer hover:bg-slate-950/10" colSpan={4}>Add</td>
                        </tbody>
                    </table>
                </div>
                <div className="overline decoration-dotted flex justify-between p-3 mt-10">
                    <span>Employee Signature</span>
                    <span>Authority Signature</span>
                </div>
            </div>
        </div>
    );
};

export default CreateInvoice;