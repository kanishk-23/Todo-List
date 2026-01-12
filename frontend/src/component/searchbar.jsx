import { useState, useEffect, useRef } from 'react';
import { useTodocontext } from '../context_and_hooks/todo_context';
import { FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);
    const {state, dispatch} = useTodocontext();

    useEffect(() => {
        if (searchTerm.trim()){
            const results = (state.todos).filter(todo =>todo.task.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(results.slice(0, 8));
        }
        else setSearchResults([]);
    }, [searchTerm, state.todos]);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)){
                setSearchTerm('');
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} className="relative z-50 w-full my-4">
            <div className={'w-full max-w-xl mx-auto'}>
                <input placeholder='Search your todo...' title='Search your todo' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 bg-white border-2 border-gray-300 text-xl rounded-lg"/>
            </div>

            {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 w-full max-w-xl mx-auto z-50">
                    <div className="bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        <div className="sticky top-0 left-0 bg-blue-900 p-1 rounded-t-lg flex items-center justify-between">
                            <span className="text-sm font-bold text-white p-1.5 rounded-t-lg">{searchResults.length} results</span>
                            <button title="Close search" className="text-red-500 p-1 mr-1.5 rounded-t-lg bg-white"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSearchResults([]);
                                }}
                            ><FaTimes/> </button>
                        </div>
                        <div className="max-h-60 overflow-y-scroll scroll-hide relative">
                            {searchResults.map((todo) => (
                                <button key={todo._id} className={"w-full p-2 border-b-2 border-gray-100 group flex items-start gap-1 hover:bg-black/1"}>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ todo.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-600' }`}> 
                                                { todo.is_active ? 'Active' : 'Inactive' }
                                            </span>
                                        </div>
                                        <p className="font-semibold text-lg text-gray-700 group-hover:text-blue-500 truncate">
                                            {todo.task}
                                        </p>
                                        <div className='flex flex-row justify-around'>
                                            <p className="text-xs text-gray-400 mt-0.5">Start: {todo.start_date.slice(0, 10)}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">Due: {todo.due_date.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-green-600 p-1 rounded-lg shadow-md hover:bg-white" onClick={() => dispatch({type:'OpenModal', payload:{mode:'view',todo}})}><FaEye/></span>
                                        <span className="text-yellow-600 p-1 rounded-lg shadow-md hover:bg-white" onClick={() => dispatch({type:'OpenModal', payload:{mode:'edit',todo}})}><FaEdit/></span>
                                        <span className="text-red-600 p-1 rounded-lg shadow-md hover:bg-white" onClick={() => dispatch({type:'OpenModal', payload:{mode:'delete',todo}})}><FaTrash/></span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Searchbar;
