import React from "react";
import { todoService } from "../service/api_service";
import {useTodocontext}  from "../context_and_hooks/todo_context";
import {useState } from "react";
function Addform(){
    
    const {state,dispatch} = useTodocontext();
    const {error} = state;
    const [form, setform] = useState({task: "", start_date: "", due_date: ""});
    const onSubmit=()=>{
        dispatch({type:"LoadingStart"});
        // dispatch({type:"LoadError", payload:res});
        todoService.createTodo(form).then(res=> {
            dispatch({type:"AddTodo", payload:res.data.data});
            setform({task: "", start_date: "", due_date: ""});
        }).catch(res=>{
            dispatch({type:"LoadError", payload:res.response?.data?.message})
        });
    };
    return(
        <div className="flex flex-col gap-4 max-w-full w-md">
            <div className="py-4 border-b border-gray-200">
                <h2 className="w-full leading-[28px] m-0">Add Task</h2>
            </div>
            {error && <p className="text-red-500">{error}</p> }
            <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Task description</label>
                    <input className="text-gray-600" type="text" value={form.task} placeholder="Task" onChange={e => setform(prev=>({...prev,task: e.target.value}))}></input>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Start date:</label>
                    <input className="text-gray-600" type="date" value={form.start_date} placeholder="Start Date" onChange={e => setform(prev=>({...prev, start_date: e.target.value}))}></input>
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Due date:</label>
                    <input className="text-gray-600" type="date" value={form.due_date} placeholder="Due Date" onChange={e => setform(prev=>({...prev, due_date: e.target.value}))}></input>
                </div>
            </div>
            <div className="flex gap-2 border-t border-gray-200 pt-3">
                <button type="submit" onClick={onSubmit} className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white shadow-md">Add</button>
            </div>
        </div>
    )

}

export default Addform;