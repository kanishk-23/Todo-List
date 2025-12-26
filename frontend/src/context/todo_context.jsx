import React from "react";
import { createContext, useReducer, useContext } from "react";
export const todocontext= createContext();
export function useTodocontext(){
    const context= useContext(todocontext);
    if(!context) throw new Error("useTodocontext should be in provider");
    return context;
}

const initialState = {
    todos:[],
    loading: false,
    error:'',
    modalOpen:false,
    modalMode:'',
    activeTodo:'',
}

export const todoreducer = (state, action)=>{
    switch (action.type) {
        case 'LoadingStart':
            return {...state, loading: true, error: ''};
        case 'LoadError':
            return {...state, loading: false, error: action.payload};
        case 'LoadingSuccessful':
            return {...state, loading: false, todos: action.payload, error: ''};
        // case 'UpdateForm':
        //     return {...state, form: {...state.form, ...action.payload}};
        case 'AddTodo':
            return {...state, loading: false, todos: [...state.todos, action.payload], error: ''};
        case 'UpdateTodo':
            return {...state, loading: false, todos: state.todos.map(t => t._id === action.payload._id ? action.payload : t), modalOpen: false };
        case 'DeleteTodo':
            return {...state, todos: state.todos.filter(t => t._id !== action.payload._id ), loading: false, modalOpen: false};
        case 'OpenModal':
            return {...state, modalOpen: true, modalMode: action.payload.mode, activeTodo: action.payload.todo, loading: false};
        case 'CloseModal':
            return {...state, modalOpen: false, modalMode: '', activeTodo: '', error: ''};
        default:
            return state;
    }
}

export function TodoProvider({children}){
    const [state,dispatch] = useReducer(todoreducer, initialState);
    return(
        <todocontext.Provider value={{state, dispatch}}>
            {children}
        </todocontext.Provider>
    )
}

