import { Button, Modal, Select, Table } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import { TableDraggable } from "reactjs-table-draggable";






const TaskList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [columns, setColumns] = useState([
    { field: 'id', label: 'ID' },
    { field: 'first_name', label: 'First Name' },
    { field: 'last_name', label: 'Last Name' },
    { field: 'address', label: 'Address' },
  ])

  const handleChange = (field, label) => {
    for (const col of columns) {
      if (col.field === field) {
        col.label = label
      }
    }
    setColumns([...columns])
  }

  const onDragEnd = columns => {
    setColumns([...columns])
  }

  const rows = [
    { id: 1, first_name: 'Jhon', last_name: 'Doe', address: 'New York, USA',  },
    { id: 2, first_name: 'Jane', last_name: 'Doe', address: 'Washington, USA',  },
    { id: 3, first_name: 'Bob', last_name: 'Smith', address: 'Los Angeles, USA', },
  ]
  const renderCell = (cell, row) => (
    <td
      key={cell.id}
      style={{ color: row.last_name === 'Doe' ? 'green' : 'yellow' }}
    >
      {cell.value}
    </td>
  );


  return (
    <div className="px-20">
      {/* <Button >Toggle modal</Button> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Task Review</Modal.Header>
        <Modal.Body>
          <Select id="countries" required>
            <option>Approve</option>
            <option>Decline</option>
          </Select>
          <Select id="countries" required className="mt-2">
            <option>5 star</option>
            <option>4 star</option>
            <option>2 star</option>
          </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="text-center mt-4 bg-[#0891B2] text-white font-semibold py-2">
        Task list
      </h1>
      {/* <Table className="text-[12px] md:text-[16px] mt-2 mb-20">
        <Table.Head className="">
          <Table.HeadCell className="text-center">Number</Table.HeadCell>
          <Table.HeadCell className="text-center">Name</Table.HeadCell>
          <Table.HeadCell className="text-center">Date</Table.HeadCell>
          <Table.HeadCell className="text-center">Task Link</Table.HeadCell>
          <Table.HeadCell className="text-center">Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="">
          <Table.Row className="text-center border">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Shaharia</Table.Cell>
            <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
            <Table.Cell className="text-blue-500">Link</Table.Cell>
            <Table.Cell className="text-balck">
              <buuton
                className="bg-yellow-200 px-5 py-1 cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                pending
              </buuton>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="text-center border">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Shaharia</Table.Cell>
            <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
            <Table.Cell className="text-blue-500">Link</Table.Cell>
            <Table.Cell className="text-balck">
              <buuton
                className="bg-yellow-200 px-5 py-1 cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                pending
              </buuton>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="text-center border">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Shaharia</Table.Cell>
            <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
            <Table.Cell className="text-blue-500">Link</Table.Cell>
            <Table.Cell className="text-balck">
              <buuton
                className="bg-yellow-200 px-5 py-1 cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                pending
              </buuton>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="text-center border">
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Shaharia</Table.Cell>
            <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
            <Table.Cell className="text-blue-500">Link</Table.Cell>
            <Table.Cell className="text-balck">
              <buuton
                className="bg-yellow-200 px-5 py-1 cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                pending
              </buuton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table> */}
       <div className="ag-theme-quartz w-full" >
       <TableDraggable
      data={rows}
      editable={true}
      onChange={handleChange}
      columns={columns}
      onDragEnd={onDragEnd}
      
  
    />
    </div>
    </div>
  );
};

export default TaskList;
