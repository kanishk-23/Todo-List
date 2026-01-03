import { useEffect, useState } from "react";
import { useTodocontext } from "../context_and_hooks/todo_context";
import {todoService} from "../service/api_service";

function Editform({onClose}){
    const {state, dispatch} = useTodocontext();
    let {activeTodo, error} = state;
    const [form, setform] = useState({task: "", start_date: "", due_date: ""});
    
    useEffect(()=>{
        if(activeTodo){setform({
            task: activeTodo.task,
            start_date: activeTodo.start_date.slice(0, 10),
            due_date: activeTodo.due_date.slice(0, 10)
        })
    }},[activeTodo]);
    
    const onSubmit=()=>{
        if(!form.task ||!form.start_date ||!form.due_date){
            dispatch({type:"LoadError", payload:error});
        }
        todoService.updateTodo(activeTodo._id, form).then(res=> {
            dispatch({type:"UpdateTodo",payload: res.data.data});
            setform({task: "", start_date: "", due_date: ""});
        })
        .catch(res=> {
            dispatch({type:"LoadError",payload:res.response?.data?.message})
        });
    };

    return(
        <>
        <div className="flex flex-col gap-4 w-full">
            <div className="py-4 border-b border-gray-200">
                <h2 className="w-full leading-[28px] m-0">Edit Task</h2>
                <p className="text-red-500">{error}</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Task description</label>
                    <input type="text" placeholder="Task" value={form.task} onChange={e => setform(prev=>({...prev, task: e.target.value}))}/>
                </div>
                <div className="flex w-full gap-2">
                    <div className="flex flex-col flex-1">
                        <label className="text-xs fond-medium text-gray-400">Start Date</label>
                        <input type="date" placeholder="Start Date" value={form.start_date} 
                        onChange={e => setform(prev=>({...prev, start_date: e.target.value}))}
                        className=""/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="text-xs fond-medium text-gray-400">Start Date</label>
                        <input type="date" placeholder="Due Date" value={form.due_date} 
                        onChange={e => setform(prev=>({...prev, due_date: e.target.value}))}
                        className=""/>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 border-t border-gray-200 pt-3">
                <button onClick={onClose} className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white shadow-md">Cancel</button>
                <button onClick={onSubmit} className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white shadow-md">Save</button>
            </div>
        </div>
        </>
    )

}

export default Editform;