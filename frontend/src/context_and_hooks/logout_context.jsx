import React from "react";
import { useAuthcontext } from "./auth_context";
import { useTodocontext } from "./todo_context";
export const useLogout=()=>{
    const {dispatch} = useAuthcontext();
    const {dispatch: todoDispatch} = useTodocontext();
    
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type : "Logout"});
        todoDispatch({type: "Clear"});
    }
    return {logout};
}