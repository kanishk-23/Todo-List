import { useAuthcontext } from "../context_and_hooks/auth_context";
import { useLogout } from "../context_and_hooks/logout_context";
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuHandler,
    MenuList,
} from "@material-tailwind/react";
import { MdOutlineMeetingRoom } from "react-icons/md";

function Navbarcomp(){
    const { state } = useAuthcontext();
    const user = state?.user;
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="grid grid-cols-2 justify-between items-center p-4 text-white mb-6 bg-blue-500">
            <div>
                <p className="text-left text-5xl font-semibold">Todo List</p>
            </div>
            <div className="text-right">
                {user ?(
                    <div className="inline-block">
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <button className="w-12 h-12 text-2xl font-bold text-white rounded-full bg-white/20 hover:text-blue-900">
                                    {user.username?.charAt(0)?.toUpperCase() || 'U'}
                                </button>
                            </MenuHandler>
                            <MenuList className="w-70 rounded-md p-2">
                                <div className="text-right">
                                    <p className="font-bold text-lg text-gray-600">{user.email}</p>
                                    <p className="text-md text-gray-600">{user.username}</p>
                                </div>
                                <button title="Logout" onClick={handleLogout} className="px-2 text-red-500 text-3xl font-semibold rounded-xl border border-red-700 hover:bg-red-100"><MdOutlineMeetingRoom /></button>
                            </MenuList>
                        </Menu>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
export default Navbarcomp;