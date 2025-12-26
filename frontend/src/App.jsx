import React from "react";
import './App.css';
import { useEffect } from 'react';
import { useTodocontext } from './context/todo_context';
import { getTodos } from './service/todo_service';
import Todolist from'./component/todo_list';

function App() {
  const {state, dispatch} = useTodocontext();
  useEffect(()=>{
    dispatch({type: 'LoadingStart'})   
    getTodos()
    .then(res => dispatch({type: 'LoadingSuccessful', payload: res.data.data}))
    .catch(res => dispatch({type: 'LoadError', payload: res.response?.data?.message || 'Server Error', }));
  },[dispatch]);

  return (
    <>
    <div>
      <Todolist/>
    </div>
    </>
  );
}

export default App;
