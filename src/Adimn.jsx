import { Navigate } from "react-router-dom";

const Admin = ({children}) => {
    if (localStorage.getItem('type')=='Admin') {
        return children;
    }
    return <Navigate to="/login">Login</Navigate>;
};

export default Admin;