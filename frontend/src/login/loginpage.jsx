import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context_and_hooks/login_context";
import { MdMeetingRoom } from "react-icons/md";


function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, loading, error} = useLogin();
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await login(email, password);
    }
    return(
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
            <div>
                <button onClick={()=>navigate("/signup")}>Signup</button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</h2>
            <div className="p-2">
                <div>
                    {/* <label className="block text-sm font-medium text-gray-400">Email</label> */}
                    <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} value={email}
                    className="mt-1 block w-full rounded-md px-3 py-2" required/>
                </div>
                <div>
                    {/* <label className="block text-sm font-medium text-gray-400">Password</label> */}
                    <input type="text" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password}
                    className="mt-1 block w-full rounded-md px-3 py-2" required/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                {error && <p className="text-red-500">{error}</p>}
                <button title="Login" disabled={loading} onClick={handleSubmit} className="px-2 text-4xl font-medium rounded-xl text-gray-700 py-2"><MdMeetingRoom /></button>
            </div>
        </div>
    </div>
    )
}

export default LoginPage;