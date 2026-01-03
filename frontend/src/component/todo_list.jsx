import React, { useEffect } from "react";
import {useTodocontext}  from "../context_and_hooks/todo_context";
import {todoService} from "../service/api_service";
import {FaEye, FaEdit, FaTrash, FaArrowRight, FaArrowLeft} from 'react-icons/fa';
import Modal from "./modal_form";
import Viewform from "./view_form";
import Editform from "./edit_form";
import Addform from "./new_todo_form";
import Navbarcomp from "./navbar";

function TodoList(){
	const MAX_LEN = 10;
	const truncate = (text='') => (text && text.length > MAX_LEN) ? text.slice(0, MAX_LEN) + '…' : text;

	const {state, dispatch} = useTodocontext();
	useEffect(()=>{
		dispatch({type: 'LoadingStart'});
		todoService.getTodos()
		.then(res => dispatch({type: 'LoadingSuccessful', payload: res.data.data || []}))
		.catch(err => dispatch({type: 'LoadError', payload: err.response?.data?.message || 'Server Error' }));
		},[dispatch]);

	const {modalOpen, modalMode, activeTodo, error} = state;
	const todos = state?.todos ?? [];  
	const activetasks = todos.filter(t=>t.is_active);
	const inactivetasks = todos.filter(t=>!t.is_active);
    
	const switchActiveStatus = (task) => {
        const newStatus = !task.is_active;
        dispatch({type:'LoadingStart'});
        todoService.updateTodo(task._id, { is_active: newStatus })
        .then(res => {
            dispatch({type:'UpdateTodo',payload: res.data.data })
        })
        .catch(res => {
            dispatch({type:'LoadError',payload: res.response?.data?.message || 'Server Error'})
        });
    };

    return (
		<div className="max-h-screen flex-col items-center justify-items-center align-middle">
			<div className="w-full">
				<Navbarcomp/>
			</div>
			<div className="w-full h-[70vh] flex flex-row items-center justify-center align-middle gap-4">
				{/* ACTIVE TASK */}
				<div className="w-[320px] flex-1 flex flex-col h-full bg-white rounded-lg p-4 shadow-lg">
					<div className="py-2 border-b border-gray-400 mb-6">
						<h3 className="text-xl font-bold text-blue-900 leading-[28px] m-0">Active Tasks</h3>
					</div>
					<div className="flex-1 flex flex-col overflow-y-scroll scroll-hide relative" >
						<table className="w-full relative">
							<thead className="sticky top-0 left-0 bg-blue-900 text-gray-50">
								<tr>
									<th className="p-4 font-semibold w-1/3 text-sm">Task</th>
									<th className="p-4 font-semibold w-1/3 text-sm">Move</th>
									<th className="p-4 font-semibold w-1/3 text-sm">Actions</th>
								</tr>
							</thead>
							<tbody>
								{activetasks.map((todo) => (
									<tr key={todo._id} className="border-b border-gray-300">
										<td className="p-4 max-w-sm text-sm">{truncate(todo.task)}</td>
										<td className="p-4 text-center">
											<button onClick={() => switchActiveStatus(todo)} className="text-blue-800 p-2 rounded-lg shadow-md"><FaArrowRight /></button>
										</td>
										<td className="p-4">
											<div className="flex gap-2 justify-end">
												<button className="text-green-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'view',todo}})}><FaEye/></button>
												<button className="text-yellow-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'edit',todo}})}><FaEdit/></button>
												<button className="text-red-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'delete',todo}})}><FaTrash/></button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* ADD FORM */}
				<div className="w-[260px] h-[fit-content] bg-white rounded-lg shadow-lg p-4">
					<Addform />
				</div>
				{/* INACTIVE TASK */}
				<div className="w-[320px] flex-1 flex flex-col h-full bg-white rounded-lg p-4 shadow-lg">
					<div className="py-2 border-b border-gray-400 mb-6">
						<h3 className="text-xl font-bold text-blue-900 leading-[28px] m-0">Inactive Tasks</h3>
					</div>
					<div className="flex-1 flex flex-col overflow-y-scroll scroll-hide relative">
						<table className="w-full relative">
							<thead className="sticky top-0 left-0 bg-blue-900 text-gray-50">
								<tr>
									<th className="p-4 font-semibold w-1/3 text-sm">Task</th>
									<th className="p-4 font-semibold w-1/3 text-sm">Move</th>
									<th className="p-4 font-semibold w-1/3 text-sm">Actions</th>
								</tr>
							</thead>
							<tbody>
								{inactivetasks.map((todo) => (
									<tr key={todo._id} className="border-b border-gray-300">
										<td className="p-4 max-w-sm text-sm">{truncate(todo.task)}</td>
										<td className="p-4 text-center">
											<button onClick={() => switchActiveStatus(todo)} className="text-blue-800 p-2 rounded-lg shadow-md"><FaArrowLeft /></button>
										</td>
										<td className="p-4">
											<div className="flex gap-2 justify-end">
												<button className="text-green-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'view',todo}})}><FaEye/></button>
												<button className="text-yellow-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'edit',todo}})}><FaEdit/></button>
												<button className="text-red-600 p-1 rounded-lg shadow-md" onClick={() => dispatch({type:'OpenModal', payload:{mode:'delete',todo}})}><FaTrash/></button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{modalOpen && activeTodo && (
				<Modal onClose={() => dispatch({type:'CloseModal'})}>
					{modalMode === 'view' && (
						<Viewform
						onClose={()=>dispatch({type:'CloseModal'})}/>
					)}
					{modalMode === 'edit' && (
						<Editform
						onClose={()=>dispatch({type:'CloseModal'})}/>
					)}
					{modalMode === 'delete' && (
						<div className="flex flex-col gap-4 w-full">
							<div className="py-4 border-b border-gray-200">
								<h2 className="w-full leading-[28px] m-0">Delete Todo</h2>
							</div>
							<div>
								<p>Are you sure, you want to delete this task?</p>
							</div>
							<div className="flex gap-2 border-t border-gray-200 pt-3">
								<button onClick={()=>dispatch({type:'CloseModal'})} className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white shadow-md">Cancel</button>
								<button className="flex-1 rounded-sm py-2 border-none text-sm font-medium text-blue-600 bg-white shadow-md"
								onClick={()=>{
									todoService.deleteTodo(activeTodo._id);
									dispatch({type:'DeleteTodo',payload: activeTodo})}}>Delete</button>
							</div>
						</div>
					)}
				</Modal>
			)}
		</div>
    );
}

export default TodoList;