import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

import navigation from "../../config/navigation";
import { logout } from "../../features/auth/store/authSlice";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/store/authSelectors";

const Sidebar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const handleLogout = async () => {

        try {

            await dispatch(logout()).unwrap();

            toast.success("Logged out successfully");

            navigate("/login", {
                replace: true
            });

        } catch (error) {

            toast.error(error || "Logout failed");

        }

    };

    return (

        <aside className="w-64 bg-slate-900 text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">

                    RAG Assistant

                </h1>

                <div className="mt-6 flex items-center gap-3">

                    <div
                        className="
                w-12
                h-12
                rounded-full
                bg-blue-600
                flex
                items-center
                justify-center
                text-lg
                font-semibold
            "
                    >

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div className="min-w-0">

                        <h2 className="font-semibold truncate">

                            {user?.name}

                        </h2>

                        <p className="text-sm text-slate-400 truncate">

                            {user?.email}

                        </p>

                    </div>

                </div>

            </div>

            <nav className="flex-1 p-4">

                {

                    navigation.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.id}

                                to={item.path}

                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition
                                    ${isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                    }`
                                }

                            >

                                <Icon size={20} />

                                <span>

                                    {item.label}

                                </span>

                            </NavLink>

                        );

                    })

                }

            </nav>

            <div className="p-4 border-t border-slate-700">

                <button

                    onClick={handleLogout}

                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-4
                        py-3
                        hover:bg-red-600
                        transition
                    "

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;