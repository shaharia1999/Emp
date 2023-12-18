
import { Editor } from '@tinymce/tinymce-react';
import { Table } from 'flowbite-react';
import moment from 'moment';
import { useState } from 'react';
const TINY = () =>
{
  const [value,setValue]=useState(null);
  console.log(value);
  const handleEditorChange = (content) => {
    setValue(content);
  };
  return (

    <div className='px-20 mt-20'>
    <div className='mt-10 grid   '>
      <h1 className='text-3xl pb-4 px-5 '>Submit Your Tasks and Wait for Review </h1>
    <Editor
      apiKey='glgt2ka62szakfifl35ejbg97lje8m14lffv8w3eegkuwbu9'
      init={{
        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        // mergetags_list: [
        //   { value: 'First.Name', title: 'First Name' },
        //   { value: 'Email', title: 'Email' },
        // ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      value={value}
      onEditorChange={handleEditorChange}
    />
    <buttun className='bg-green-500 px-10 py-2 mt-2 text-white rounded-md  cursor-pointer text-center hover:bg-pink-600'>Submit Task</buttun>
    </div>
    <div>
      <h1 className='text-center mt-4 bg-[#0891B2]  text-white font-semibold py-2'>Task Submitted list</h1>
      <Table className="text-[12px] md:text-[16px] mt-2 mb-20">
            <Table.Head className="">
              {/* <Table.HeadCell className="hidden  lg:table-cell">No.</Table.HeadCell> */}
              <Table.HeadCell className='text-center'>Number</Table.HeadCell>
              <Table.HeadCell className='text-center'>Date</Table.HeadCell>
              <Table.HeadCell className='text-center'>Task Link</Table.HeadCell>
              <Table.HeadCell className='text-center'>Status</Table.HeadCell>
              <Table.HeadCell className='text-center'>Review</Table.HeadCell>
          
            </Table.Head>
            <Table.Body className="">
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell >pending</Table.Cell>
                    <Table.Cell >5</Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell >pending</Table.Cell>
                    <Table.Cell >5</Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell >pending</Table.Cell>
                    <Table.Cell >5</Table.Cell>
            </Table.Row>
            <Table.Row className='text-center border'>
            <Table.Cell>1</Table.Cell>
                    <Table.Cell>{moment().format("D-MM-YYY")}</Table.Cell>
                    <Table.Cell className='text-blue-500'>Link</Table.Cell>
                    <Table.Cell >pending</Table.Cell>
                    <Table.Cell >5</Table.Cell>
            </Table.Row>
           
            
              
            </Table.Body>
          </Table>
    </div>
    </div>
  );
}
export default TINY;