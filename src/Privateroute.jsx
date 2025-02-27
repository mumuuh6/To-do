import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./pages/Authprovider";

const Privateroute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    if (user) {
        return children;
    }
    if (loader) {
        return <div className="flex justify-center items-center gap-8 h-screen w-full">
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>
            <span className="loading loading-ball loading-lg"></span>

        </div>
    }
    return (
        <div>
            <Navigate to='/tasks'></Navigate>
        </div>
    );
};

export default Privateroute;