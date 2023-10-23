import Button from '@mui/material/Button';
import { AiOutlinePoweroff } from "react-icons/ai";
const EmpAttendance = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Button variant="contained" ><AiOutlinePoweroff className='text-7xl'></AiOutlinePoweroff></Button>
        </div>
    );
};

export default EmpAttendance;