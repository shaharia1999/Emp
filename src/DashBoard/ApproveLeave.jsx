import { Button, Modal, Select, Table } from "flowbite-react";
import moment from "moment";
import { useState } from "react";


const ApproveLeave = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="px-20">
            {/* <Button >Toggle modal</Button> */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
        <Select id="countries" required>
        <option>Approve</option>
        <option>Decline</option>
      </Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
            <h1 className="text-center mt-4 bg-[#0891B2] text-white font-semibold py-2">Leave Applicants</h1>
            <Table className="text-[12px] md:text-[16px] mt-2 mb-20">
            <Table.Head className="">
              {/* <Table.HeadCell className="hidden  lg:table-cell">No.</Table.HeadCell> */}
              <Table.HeadCell className='text-center'>Number</Table.HeadCell>
              <Table.HeadCell className='text-center'>Name</Table.HeadCell>
              <Table.HeadCell className='text-center'>Date</Table.HeadCell>
              <Table.HeadCell className='text-center'>Application Link</Table.HeadCell>
              <Table.HeadCell className='text-center'>Action</Table.HeadCell>
          
            </Table.Head>
            <Table.Body className="">
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>Shaharia</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell className='text-balck'><buuton className="bg-yellow-200 px-5 py-1 cursor-pointer"onClick={() => setOpenModal(true)}>pending</buuton></Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>Shaharia</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell className='text-balck'><buuton className="bg-yellow-200 px-5 py-1 cursor-pointer"onClick={() => setOpenModal(true)}>pending</buuton></Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>Shaharia</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell className='text-balck'><buuton className="bg-yellow-200 px-5 py-1 cursor-pointer"onClick={() => setOpenModal(true)}>pending</buuton></Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>Shaharia</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell className='text-balck'><buuton className="bg-yellow-200 px-5 py-1 cursor-pointer"onClick={() => setOpenModal(true)}>pending</buuton></Table.Cell>
            </Table.Row>
            
            
              
            </Table.Body>
          </Table>
        </div>
    );
};

export default ApproveLeave;