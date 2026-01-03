import React ,{ useState } from "react";
import { useAuthcontext } from "./auth_context";
import { useNavigate } from "react-router-dom";

export const useLogin=()=>{
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthcontext();
    const navigate = useNavigate();
    const login= async (email, password)=>{
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/user/login',{
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({email, password})
        });
        const json = await response.json();
        if(!response.ok){
            setLoading(false);
            setError(json.message);
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json)); 
            const payload = {token: json.data.token, user: json.data.user};
            dispatch({type: "Login", payload: payload});
            navigate('/todos',{replace:true});
            setLoading(false);
        }
    }
    return {login, loading, error};
};