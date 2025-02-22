import React, { useContext } from 'react';
import { AuthContext } from './Authprovider';


const Dashboard = () => {
    const {user,
        signin,
        googlesignin}=useContext(AuthContext);
    const handlegoogle=()=>{
        googlesignin()
    .then(res=>console.log('j'))
    }
    return (
        <div>
            <button onClick={handlegoogle}>g</button>
        </div>
    );
};

export default Dashboard;