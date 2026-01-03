import React, {useContext, createContext, useReducer, useEffect} from "react";
const initialState = {
    user:null,
    token:null
};
export const authreducer=(state,action)=>{
    switch(action.type){
        case 'Login': return {...state, user: action.payload.user, token: action.payload.token,};
        case 'Logout': return {...state, user: null, token: null};
        default: return state;
    }
}

export const Authcontext = createContext();
export function AuthProvider({children}){
    const [state,dispatch] = useReducer(authreducer, initialState);
    useEffect(()=>{
        const raw = localStorage.getItem('user') || 'null';
        const data = JSON.parse(raw);
        if(data){
            const token = data.token 
            const user = data.user || data?.newuser;
            dispatch({type: "Login", payload: { token, user }});
        }
    },[])
    return(
        <Authcontext.Provider value={{state, dispatch}}>
            {children}
        </Authcontext.Provider>
    )
}

// hook
export function useAuthcontext(){
    const context = useContext(Authcontext);
    if(!context) throw new Error("useAuthcontext should be in provider");
    return context;
}