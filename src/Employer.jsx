import axios from "axios";
import { TextInput } from "flowbite-react";
import ApiUrl from "./ApiUrl";
import { useState } from "react";
import moment from "moment";
import { toWords } from "number-to-words";
import { split } from "postcss/lib/list";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Add } from "./store/Invoice";

// console.log(id);

const Employers = () => {
  const [student, setStudent] = useState(null);
  const [newarrey,setNewarrey]=useState([])
  console.log(student);
  const [total,setTotal]=useState(0)
  const dispatch = useDispatch()

  function Search() {
    let email = document.getElementById("title").value.trim();
    let id = localStorage.getItem("id");
    axios.get(ApiUrl.Type+`/${id}`).then((res)=>{
      // console.log(res);
      axios
      .post(ApiUrl.getStudentInfo, { huzaifa: String(res.data.aws_id).toLowerCase(), shaharia: email })
      .then((res) => {
        setStudent(res.data);
        let count=0
        res.data[1]?.forEach(x => {
         console.log(Number(x.amount)) ;
         count += Number(x.amount)
            
        })
        setTotal(count)
        document.getElementById("title").value = "";
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        Swal.fire({
          title: err.response.data.msg,
          text:err.response.data.msg,
          icon: "error",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          showConfirmButton: true,
          showCancelButton: true,
        })
        document.getElementById("title").value = "";
      });
    }).catch((err)=>{
      Swal.fire({
        title: err.response.data.msg,
        text:err.response.data.msg,
        icon: "error",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: true,
        showCancelButton: true,
      })

    })
   
  }
  function Remove(index){
      student[1]?.splice(index,1);
      console.log(student);
      setStudent([...student])
      let count=0
      student[1]?.forEach(x => {
       count += Number(x.amount)
          
      })
      setTotal(count)
      
   
  }
  const PDf=()=>{
    let wordtotal=document.getElementById('wordtotal').innerText;
    student.push(wordtotal,total)
     dispatch(Add(student,wordtotal))
   }
  // function MakePDF3() {
  //  let wordtotal=document.getElementById('wordtotal').innerText;
   
  //  console.log(student);

    // axios.post(ApiUrl.getStudentInfoPdf,{student,total,wordtotal}).then((res) => {
    // let newBase = ApiUrl.BaseUrl.substring(0, ApiUrl.BaseUrl.length - 1)
    // console.log(newBase);
    // // console.log(res.data);
    // // console.log( res.data.split('/'));
   
    // const link = document.createElement('a');
    // link.href = newBase+res.data;
    // link.setAttribute('download', String(res.data).split('/').pop());
    // link.click();
    // // Cleanup
    // link.remove();
    // })
// }
    
  
  return (
    <div className="flex  justify-center font-Rovoto">
      <div>
        <div className="w-[768px] relative ">
          <TextInput id="title" required type="text" name="title" />
          <addr
            className="bg-[#0891B2] hover:bg-lime-600 px-4 py-[9px] absolute right-0 top-0 rounded-r-lg text-white cursor-pointer"
            onClick={Search}
          >
            Search
          </addr>
        </div>
        {
            student&&  <div
            id="print"
            className=" mt-4 shadow-md p-4 w-[768px] h-[1056px] relative mb-7 "
          >
            <center className="text-2xl ">{student[0]?.reg_fullname}</center>
            <div className="flex justify-between mt-5">
              <div>
                {" "}
                <p><addr className='font-semibold'>Course : </addr>{student[0]?.reg_course}</p>
                <p><addr className='font-semibold'>Mobile :</addr> {student[0]?.reg_mobile}</p>
                <p><addr className='font-semibold'>Email :</addr> {student[0]?.reg_email}</p>
              </div>
              <div>
                
                <p><addr className='font-semibold'>Installment :</addr>{student[0]?.installment}</p>
                <p>
                <addr className='font-semibold'>Addmition :</addr> {student[0]?.is_admission_done ? "True" : "False"}
                </p>
              </div>
            </div>
            <table className="w-full  border-collapse break-all mt-8">
                            <thead>
                                <tr>
                                    <th className="border border-black ">Number</th>
                                    <th className="border border-black ">Amount</th>
                                    <th className="border border-black ">Time</th>
                                    <th className="border border-black ">Action</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student[1]?.map((x, index) => {
                                        
                                        
                                        
                                        return (
                                            <tr key={index}>
                                                <td className="border border-black pl-5 text-center">{index}</td>
                                                <td className="border border-black pl-5 text-center "><pre className=" ">{x.amount} </pre> </td>
                                                <td className="border border-black pl-5 text-center">{moment(x.time).format('MMMM Do YYYY')}</td>
                                                <td className="border border-black pl-5 text-center bg-amber-500 text-white cursor-pointe hover:bg-red-500" onClick={()=>
                                                   Remove(index)}>
                                                 
                                                   Delete
                                                </td>
                                               
                                                
                                            </tr>
                                            
                                        )
                                    })
                                }
                                {
                                    <tr>
                                        <td className="font-semibold border border-black pl-5 text-center">Total</td>
                                        <td className="border border-black pl-5 text-center font-semibold">{total}</td>
                                        <td className="border border-black pl-5 text-center uppercase" id='wordtotal'>{toWords(Number(total))}</td>
                                        <td className="border border-black pl-5 text-center "></td>
                                    </tr>
                                }
                               
                            </tbody>
                        </table>
                        <center className="mt-10">
                        {/* <button className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `} onClick={MakePDF3}>
                        Save PDF
                       </button> */}
                       <Link to='invoice'>
                       <button onClick={PDf} className={`bg-[#0891B2] hover:bg-lime-600 text-white px-8 py-2 rounded-lg `} >
                        Push
                       </button>
                       </Link>
                        
                        </center>
                     
          </div>
        }
       
      </div>
    </div>
  );
};

export default Employers;
