import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ApiUrl from './ApiUrl';
import { useEffect, useState } from 'react';
import { Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
const InsideModal = ({ year, month, id, addRow,setOpenModal }) => {
    const [info,setInfo]=useState(null)
    useEffect(() => {
        getInfo()
    }, [])
    function getInfo() {
        if (id != null) {
            axios.put(ApiUrl.GetInfo + `${id}/`, { year: year, month: month }).then(res => {
                setInfo(res.data)
            }).catch(error => console.log(error))
        }
    }
    function otherFormSubmit(e) {
        e.preventDefault()
        let formdata= new FormData(e.target)
        addRow(Object.fromEntries(formdata))
        e.target.reset()
        setOpenModal(undefined)
        
    }
    return (
        <Tabs>
            <TabList>
                <Tab>Salary</Tab>
                <Tab>Absent</Tab>
                <Tab>Other</Tab>
            </TabList>
            <TabPanel>
                <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <form className='mx-20' id='other-form' onSubmit={(e)=>otherFormSubmit(e)}>
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