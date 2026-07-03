import { NavLink } from "react-router-dom";
import navigation from "../../config/navigation";

const Sidebar = () => {

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    RAG Assistant
                </h1>

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
                                    ${
                                        isActive
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

        </aside>
    );

};

export default Sidebar;