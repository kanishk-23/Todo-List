import { Navigate } from "react-router-dom";
import { useAuthcontext } from "./context_and_hooks/auth_context";

const ProtectedRoute = ({childern}) =>{
    const {state} = useAuthcontext();
    return state.user? childern: <Navigate to='/login'/>;
};

export default ProtectedRoute;