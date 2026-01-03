import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./login/loginpage";
import './App.css';
import Todolist from'./component/todo_list';
import SignupPage from "./login/signuppage";
import { useAuthcontext } from "./context_and_hooks/auth_context";

function App() {
  const ProtectedRoute = ({children}) =>{
    const { state } = useAuthcontext();
    return state?.user ? children : <Navigate to='/login' replace />;
  };

  return (
    <div className="w-full h-screen flex justify-center align-center">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to= "/login" replace/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/todos' element={<ProtectedRoute><Todolist/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
