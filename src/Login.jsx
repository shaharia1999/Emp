import { Button, Card } from 'flowbite-react';
import { Label, TextInput } from 'flowbite-react';
import { useNavigation } from 'react-router-dom';
const Login = () => {
    const navigate= useNavigation()
    function LoginUser(e) {
        e.preventDefault();
        let formdata=new FormData(e.target);
        console.log(Object.fromEntries(formdata))
        navigate('/profile')
    }
    return (
        <div className='flex justify-center'>
            <Card className="w-[50%]">
                <form className="flex max-w-md flex-col gap-4" onSubmit={LoginUser}>
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
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Login;