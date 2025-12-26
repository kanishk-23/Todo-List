import React from "react";
import { useTodocontext } from "../context/todo_context";

function Viewform({onClose}){
    const {state} =useTodocontext();
    const {activeTodo} = state;
    return(
        <>
        <div className="flex flex-col gap-4 w-full">
            <div className="py-4 border-b border-gray-200">
                <h2 className="w-full leading-[28px] m-0">View Task</h2>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Task description</label>
                    <textarea readOnly value={activeTodo.task} className="w-full rounded border-md border-gray-200 text-sm text-gray-900"/>
                </div>

                <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-400">Start date:</label>
                        <span className="w-full rounded-md text-sm text-gray-900">{activeTodo.start_date.slice(0, 10)}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="text-xs fond-medium text-gray-400">Due date:</label>
                        <span className="w-full rounded-md text-sm text-gray-900">{activeTodo.due_date.slice(0, 10)}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 border-t border-gray-200 pt-3">
                <button onClick={onClose} className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white" // hover:bg-blue-50"
                >Close
                </button>
            </div>
        </div>

        </>
    )
}

export default Viewform;