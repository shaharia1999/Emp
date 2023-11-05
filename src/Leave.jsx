// import React from 'react';

import { Label, Radio, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { DatePicker } from "react-rainbow-components";

const Leave = () => {
    // const initialState = {
    //     // default_date: new Date(`${year}-${month}-1 10:44`),
    //     default_date: [new Date(`${year}-${month}-1`), new Date(endDate)],
    //     locale: { name: 'en-US', label: 'English (US)' },
    // };
    const [date, setDate] = useState('')
    return (
      <div className="flex justify-center items-center h-auto w-[100%]  ">
        <div className=" w-[768px] h-auto mt-5 font-Rovoto   px-3 py-5 shadow-md ">
          <h1 className="text-center text-2xl text-[#0891B2]">Leave Request</h1>
          <p className="text-center text-lg">
            Request your leave details down below.
          </p>
          <form>
            <div className="flex gap-2 mt-5">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="First Name" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="First Name"
                  required
                  type="text"
                  name="First Name"
                />
              </div>
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Last Name" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="Last Name"
                  required
                  type="text"
                  name="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Email" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="arena@gmail.com"
                  required
                  type="email"
                  name="email"
                />
              </div>
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Mobile" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="Mobile"
                  required
                  type="number"
                  name="Mobile"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Id Number" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="User Id"
                  required
                  type="text"
                  name="id"
                />
              </div>
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Position" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="Position"
                  required
                  type="text"
                  name="position"
                />
              </div>
            </div>
            <h1 className="mt-10 text-lg text-[#0891B2]">Details of Leave</h1>
            <div className="flex gap-2 mt-5">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Leave Duration" />
                </div>
                <DatePicker
                  borderRadius="semi-rounded"
                  className="w-full"
                  valueAlignment="center"
                  labelAlignment="left"
                  id="datePicker-1"
                  name="desc"
                  value={date}
                  onChange={(value) => setDate(value)}
                  selectionType="range"
                  // locale={initialState.locale.name}
                  formatStyle="medium"
                />
              </div>
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Department" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="Department"
                  required
                  type="text"
                  name="Department"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {/* <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Position" />
                </div>
                <TextInput
                  // id="email1"
                  placeholder="Position"
                  required
                  type="text"
                  name="position"
                />
              </div> */}
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label value="Leave Type" />
                </div>
              
                <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="united-state"
                    name="countries"
                    value="Vacation"
                    defaultChecked
                  />
                  <Label htmlFor="united-state">Vacation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="germany" name="countries" value="Sick" />
                  <Label htmlFor="germany">Sick</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="spain" name="countries" value="Other" />
                  <Label htmlFor="spain">Other</Label>
                </div>
                </div>
              </div>
            </div>
            <div className="w-full">
      <div className="mb-2 block mt-2">
        <Label htmlFor="comment" value="Comment" />
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
    </div>
    <div className="flex justify-center mt-3">
    <button className="px-10 py-3 rounded-md text-white bg-[#0891B2] ">Apply</button>
    </div>
         
          </form>
        </div>
      </div>
    );
};

export default Leave;