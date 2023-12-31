import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ApiUrl from "./ApiUrl";
import { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { DatePicker } from "react-rainbow-components";
import { LuDivide } from "react-icons/lu";
import moment from "moment";
const InsideModal = ({ year, month, id, addRow, setOpenModal }) => {
  const [info, setInfo] = useState(null);
  const [salary, setSalary] = useState(null);
  const [absent, setAbsent] = useState(null);
  const [absentSumAmount, setAbsentSumAmount] = useState(null);
  let endDate = moment(year + "-" + month + "-" + 1, "YYYY-M-D")
    .endOf("month")
    .toDate();
  // let [latetime,setletTime]=useState(0)
  // console.log(latetime);
  const initialState = {
    // default_date: new Date(`${year}-${month}-1 10:44`),
    default_date: [new Date(`${year}-${month}-1`), new Date(endDate)],
    locale: { name: "en-US", label: "English (US)" },
  };

  const [date, setDate] = useState(initialState.default_date);
  useEffect(() => {
    getInfo();
  }, []);
  function getInfo() {
    if (id != null) {
      axios
        .put(ApiUrl.GetInfo + `${id}/`, { year: year, month: month })
        .then((res) => {
          setInfo(res.data);
          setAbsent(res.data.absent);
          console.log(res);
          setSalary(res.data.salary);
        })
        .catch((error) => console.log(error));
    }
  }
  function otherFormSubmit(e) {
    e.preventDefault();
    let formdata = new FormData(e.target);
    let object = Object.fromEntries(formdata);

    if (object?.days) {
      object.desc = `you are absent:${object.days}days \n${object.desc}`;
    }
    if (object?.desc2) {
      object.desc = `${object.desc} \n${object.desc2}`;
    }
    addRow(object);
    e.target.reset();
    setOpenModal(undefined);
  }

  function DateChange(value) {
    if (value.length > 1) {
      let first = moment(value[0]);
      let sec = moment(value[1]);
      let diff = sec.diff(first, "day") + 1;
      setSalary(
        parseInt(
          (Number(info.salary) / Number(endDate.getDate())) * Number(diff)
        )
      );
    }
    setDate(value);
  }
  useEffect(() => {
    // let Fromabsent =document.getElementById('absent')?.value;
    // let Fromadays =Number(document.getElementById('days')?.value);
    // let Fromfine =Number(document.getElementById('fine')?.value);
    // // let result=(Fromabsent/Fromadays)*Fromfine
    // console.log(Fromabsent);
    // // setSalary(result)
  }, []);

  function calculation() {
    let late = parseInt(
      info.late / Number(document.getElementById("days").value)
    );
    let lateculation = late * Number(document.getElementById("fine").value);
    //  console.log(lateculation);
    let absent2 = parseInt(
      absent / Number(document.getElementById("days2").value)
    );
    let absentculation =
      absent2 * Number(document.getElementById("fine2").value);
    //  console.log(absentculation);
    let sum = lateculation + absentculation;
    console.log(sum);
    return sum;
  }
  function AbsentTab() {
    setTimeout(function () {
      let amount = calculation();
      setAbsentSumAmount(amount);
    }, 100);
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Salary</Tab>
        <Tab onClick={AbsentTab}>Absent</Tab>
        <Tab>Other</Tab>
      </TabList>
      <TabPanel>
        <form
          className="mx-20"
          id="other-form"
          onSubmit={(e) => otherFormSubmit(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
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
              <Label htmlFor="desc2" value="Description" />
            </div>
            <Textarea id="desc2" name="desc2" rows={4} />
          </div>
          <div className="mt-2 rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto w-full">
            <DatePicker
              borderRadius="semi-rounded"
              className="w-full"
              valueAlignment="center"
              labelAlignment="left"
              id="datePicker-1"
              name="desc"
              value={date}
              onChange={(value) => DateChange(value)}
              selectionType="range"
              locale={initialState.locale.name}
              formatStyle="medium"
            />
          </div>
          <div className="flex gap-2">
            <div className="inline-block w-1/2 ">
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount" />
              </div>
              <TextInput
                id="amount"
                required
                type="number"
                name="amount"
                value={salary}
                onChange={(value) =>setSalary(value.value)}
              />
            </div>
            <div id="select" className="inline-block w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="status" value="Select Type" />
              </div>
              <Select id="status" required name="status">
                <option value={1}>Addition</option>
                <option value={2}>Deduction</option>
              </Select>
            </div>
          </div>
          {/* <Button type="submit" className="mt-2 w-full hover:bg-lime-500">
            Add
          </Button> */}
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="px-4 mt-2 w-full"
          >
            Add
          </Button>
        </form>
      </TabPanel>
      {/* ********************************************⏬****************************************************** */}
      <TabPanel>
        <form
          className="mx-20"
          id="other-form"
          onSubmit={(e) => otherFormSubmit(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput
              id="title"
              required
              type="text"
              name="title"
              value="Absent"
              readOnly
            />
          </div>
          <div className="flex gap-1 w-full">
            {/* <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="attend"
                                    value="Attend"
                                />
                            </div>
                            <TextInput
                                id="attend"
                                required
                                readOnly
                                value={info?.atten

                                }
                                type="number"
                            />
                        </div> */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="absent" value="Late" />
              </div>
              <div className="flex items-center gap-2">
                <TextInput
                  id="absent"
                  required
                  type="number"
                  name="days"
                  readOnly
                  value={info?.late}
                />
                <LuDivide></LuDivide>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="days" value="Days Per Fine" />
                </div>
                <div className="flex items-center gap-2">
                  <TextInput
                    id="days"
                    type="number"
                    onChange={AbsentTab}
                    defaultValue={3}
                  />
                  X
                </div>
              </div>
              <div className="ml-2 w">
                <div className="mb-2 block">
                  <Label htmlFor="fine" value="Amount Per Fine" />
                </div>
                <TextInput
                  id="fine"
                  type="number"
                  onChange={AbsentTab}
                  defaultValue={parseInt(
                    Number(info?.salary) / Number(endDate.getDate())
                  )}
                />
              </div>
            </div>
          </div>
          {/* late  End Count */}

          {/* absent start */}
          <div className="flex gap-1 w-full">
            {/* <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="attend"
                                    value="Attend"
                                />
                            </div>
                            <TextInput
                                id="attend"
                                required
                                readOnly
                                value={info?.atten

                                }
                                type="number"
                            />
                        </div> */}

            <div>
              <div className="mb-2 block">
                <Label htmlFor="absent" value="Absent" />
              </div>
              <div className="flex items-center gap-2">
                <TextInput
                  id="absent"
                  required
                  type="number"
                  // name='days'
                  readOnly
                  value={info?.absent}
                />
                <LuDivide></LuDivide>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="days" value="Days Per Fine" />
                </div>
                <div className="flex items-center gap-2">
                  <TextInput
                    id="days2"
                    type="number"
                    onChange={AbsentTab}
                    defaultValue={1}
                  />
                  X
                </div>
              </div>
              <div className="ml-2 w">
                <div className="mb-2 block">
                  <Label htmlFor="fine" value="Amount Per Fine" />
                </div>
                <TextInput
                  id="fine2"
                  type="number"
                  onChange={AbsentTab}
                  defaultValue={parseInt(
                    Number(info?.salary) / Number(endDate.getDate())
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="desc" value="Description" />
            </div>
            <Textarea id="desc" name="desc" rows={4} />
          </div>
          <div className="flex gap-2">
            <div className="inline-block w-1/2 ">
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount" />
              </div>
              <TextInput
                id="amount"
                required
                type="number"
                name="amount"
                defaultValue={absentSumAmount}
                onChange={(value) => setSalary(value.value)}
              />
            </div>
            <div id="select" className="inline-block w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="status" value="Select Type" />
              </div>
              <Select id="status" required name="status">
                <option value={2}>Deduction</option>
                <option value={1}>Addition</option>
              </Select>
            </div>
          </div>
          {/* <Button type="submit" className="mt-2 w-full hover:bg-lime-500 ]">
            Add
          </Button> */}
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="px-4 mt-2 w-full"
          >
            Add
          </Button>
        </form>
      </TabPanel>
      {/* ********************************************⏫************************************************* */}
      <TabPanel>
        <form
          className="mx-20"
          id="other-form"
          onSubmit={(e) => otherFormSubmit(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" />
            </div>
            <TextInput id="title" required type="text" name="title" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="desc" value="Description" />
            </div>
            <Textarea id="desc" name="desc" rows={4} />
          </div>
          <div className="flex gap-2">
            <div className="inline-block w-1/2 ">
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Amount" />
              </div>
              <TextInput id="amount" required type="number" name="amount" />
            </div>
            <div id="select" className="inline-block w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="status" value="Select Type" />
              </div>
              <Select id="status" required name="status">
                <option value={1}>Addition</option>
                <option value={2}>Deduction</option>
              </Select>
            </div>
          </div>
          {/* <Button type="submit" className="mt-2 w-full hover:bg-lime-500">
            Add
          </Button> */}
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="px-4 mt-2 w-full"
          >
            Add
          </Button>
        </form>
      </TabPanel>
    </Tabs>
  );
};

export default InsideModal;
