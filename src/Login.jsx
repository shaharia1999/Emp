import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import ApiUrl from './ApiUrl';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate= useNavigate()
    function LoginUser(e) {
        e.preventDefault();
        let formdata=new FormData(e.target);
        let data=Object.fromEntries(formdata)
        axios.post(ApiUrl.LoginUrl,data,{'Content-Type':'multipart/form-data'})
        .then(res=>{
            console.log(res);
            if (res.data) {
                localStorage.setItem("id",res.data.id)
                if(res?.data?.type){
                    localStorage.setItem("type",res.data?.type)
                }
                // if(localStorage.getItem('type')){
                  
                // }
                navigate("/profile")
               
               
            }
        }).catch(error=>{
            console.log(error.response)
        })

        
    }
    return (
        <div className='flex justify-center'>
            <Card className="w-[50%] flex justify-center">
                <form className="flex  flex-col gap-4 " onSubmit={LoginUser}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                            />
                        </div>
                        <TextInput
                            id="email1"
                            placeholder="name@flowbite.com"
                            required
                            type="email"
                            name='email'
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            required
                            type="password"
                            name="password"
                        />
                    </div>
                    <button type="submit" className='hover:bg-lime-600 bg-[#0891B2] py-2 rounded-lg text-white'>
                        Submit
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default Login;