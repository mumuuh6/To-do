import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../pages/Authprovider';

const Navbar = () => {
    const { user, logout,googlesignin } = useContext(AuthContext);
    const login=()=>{
        googlesignin()
        .then(res=>console.log(res))
    }
    const signout=()=>{
        logout()
        .then(res=>console.log("siggned out"))
    }
    const Links = (
        <>
            <li><Link to={`tasks`}>Add Task</Link></li>
            <li><Link to={`/`}>See Tasks</Link></li>
        </>
    );
    console.log(user)
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {Links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <button onClick={login} className="btn btn-primary">Login</button>
                ) : (
                    <>
                        <span className="mr-4">{user?.displayName}</span>
                        <img 
                            src={user?.photoURL} 
                            alt="User Avatar" 
                            className="h-8 w-8 rounded-full mr-4" 
                        />
                        <button onClick={signout} className="btn btn-secondary">Logout</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
