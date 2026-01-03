import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../context_and_hooks/signup_context";
import { MdMeetingRoom } from "react-icons/md";

function SignupPage(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 
    const {signup, loading,error} = useSignup();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        signup(email, username, password);
        
    }
    return(
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
            <div>
                <button onClick={()=>navigate("/login")}>Login</button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Sign Up</h2>
            <div className="p-2">
                <div>
                    <input type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} value={email}
                    className="mt-1 block w-full rounded-md px-3 py-2" required/>
                </div>
                <div>
                    <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} value={username}
                    className="mt-1 block w-full rounded-md px-3 py-2" required/>
                </div>
                <div>
                    <input type="text" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password}
                    className="mt-1 block w-full rounded-md px-3 py-2" required/>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                {error && <p className="text-red-500">{error}</p>}
                <button title="Sign In" disabled={loading} onClick={handleSubmit} className="px-2 text-4xl font-medium rounded-xl text-gray-700 py-2"><MdMeetingRoom /></button>
            </div>
        </div>
    </div>
    )
}
export default SignupPage;