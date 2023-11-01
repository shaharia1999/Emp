import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ApiUrl from './ApiUrl';
import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { DatePicker } from 'react-rainbow-components';
import moment from 'moment';
const InsideModal = ({ year, month, id, addRow, setOpenModal }) => {
    const [info, setInfo] = useState(null)
    const [salary,setSalary]=useState(null)
    let endDate = moment(year + '-' + month + '-' + 1 + ' 00:00:00').endOf('month').toDate();
    
    const initialState = {
        // default_date: new Date(`${year}-${month}-1 10:44`),
        default_date: [new Date(`${year}-${month}-1`),new Date(endDate)],
        locale: { name: 'en-US', label: 'English (US)' },
    };
    const [date, setDate] = useState(initialState.default_date)
    useEffect(() => {
        getInfo()
    }, [])
    function getInfo() {
        if (id != null) {
            axios.put(ApiUrl.GetInfo + `${id}/`, { year: year, month: month }).then(res => {
                setInfo(res.data)
                setSalary(res.data.salary)
            }).catch(error => console.log(error))
        }
    }
    function otherFormSubmit(e) {
        e.preventDefault()
        let formdata = new FormData(e.target)
        let object=Object.fromEntries(formdata)
        console.log(object);
        if (object?.desc2) {
            object.desc=`${object.desc} \n${object.desc2}`
        }
        addRow(object)
        e.target.reset()
        setOpenModal(undefined)
    }

    function DateChange(value) {
        if (value.length>1) {
            let first= moment(value[0])
            let sec=moment(value[1])
            let diff=sec.diff(first,'day');
            setSalary(parseInt( Number(info.salary)/Number(endDate.getDate())*Number(diff)))

        }
        setDate(value);   
    }

    return (
        <Tabs>
            <TabList>
                <Tab>Salary</Tab>
                <Tab>Absent</Tab>
                <Tab>Other</Tab>
            </TabList>
            <TabPanel>
                <form className='mx-20' id='other-form' onSubmit={(e) => otherFormSubmit(e)}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title"
                                value="Title"
                            />
                        </div>
                        <TextInput
                            id="title"
                            required
                            readOnly
                            value="Salary"
                            type="text"
                            name="title"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="desc2"
                                value="Description"

                            />
                        </div>
                        <Textarea
                            id="desc2"
                            name="desc2"
                            rows={4}
                        />
                    </div>
                    <div
                        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto w-full"
                    >
                        <DatePicker
                        borderRadius="semi-rounded"
                        className='w-full'
                        valueAlignment='center'
                        labelAlignment="left"
                            id="datePicker-1"
                            name="desc"
                            value={date}
                            onChange={value => DateChange(value)}
                            label="Given Salary Range"
                            selectionType='range'
                            locale={initialState.locale.name}
                            formatStyle="medium"
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className='inline-block w-1/2 '>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="amount"
                                    value="Amount"

                                />
                            </div>
                            <TextInput
                                id="amount"
                                required
                                type="number"
                                name="amount"
                                value={salary}
                                onChange={value => setSalary(value.value)}
                            />
                        </div>
                        <div
                            id="select"
                            className='inline-block w-1/2'
                        >
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="status"
                                    value="Select Type"
                                />
                            </div>
                            <Select
                                id="status"
                                required
                                name="status"
                            >
                                <option value={1}>
                                    Addition
                                </option>
                                <option value={2}>
                                    Deduction
                                </option>

                            </Select>
                        </div>
                    </div>
                    <Button type='submit' className='mt-2 w-full'>Add</Button>
                </form>
            </TabPanel>

            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>

            <TabPanel>
                <form className='mx-20' id='other-form' onSubmit={(e) => otherFormSubmit(e)}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title"
                                value="Title"
                            />
                        </div>
                        <TextInput
                            id="title"
                            required
                            type="text"
                            name="title"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="desc"
                                value="Description"

                            />
                        </div>
                        <Textarea
                            id="desc"
                            name="desc"
                            rows={4}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <div className='inline-block w-1/2 '>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="amount"
                                    value="Amount"

                                />
                            </div>
                            <TextInput
                                id="amount"
                                required
                                type="number"
                                name="amount"
                            />
                        </div>
                        <div
                            id="select"
                            className='inline-block w-1/2'
                        >
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="status"
                                    value="Select Type"
                                />
                            </div>
                            <Select
                                id="status"
                                required
                                name="status"
                            >
                                <option value={1}>
                                    Addition
                                </option>
                                <option value={2}>
                                    Deduction
                                </option>

                            </Select>
                        </div>
                    </div>
                    <Button type='submit' className='mt-2 w-full'>Add</Button>
                </form>

            </TabPanel>
        </Tabs>
    );
};

export default InsideModal;