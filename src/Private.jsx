import { Navigate } from "react-router-dom";

const Private = ({children}) => {
    if (sessionStorage.getItem('id')) {
        return children;
    }
    return <Navigate to="/login">Login</Navigate>;
};

export default Private;