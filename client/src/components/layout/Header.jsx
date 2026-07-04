import { useSelector } from "react-redux";

import { selectUser } from "../../features/auth/store/authSelectors";

const Header = ({ title }) => {

    const user = useSelector(selectUser);

    return (

        <header
            className="
                bg-white
                border-b
                border-slate-200
                px-8
                py-6
            "
        >

            <h1
                className="
                    text-3xl
                    font-bold
                    text-slate-900
                "
            >

                {title}

            </h1>

            <p
                className="
                    mt-3
                    text-lg
                    font-medium
                    text-slate-700
                "
            >

                👋 Welcome back,{" "}

                <span className="text-blue-600">

                    {user?.name}

                </span>

            </p>

            <p
                className="
                    mt-1
                    text-slate-500
                "
            >

                Manage your AI workspaces, upload documents and chat with your AI assistant.

            </p>

        </header>

    );

};

export default Header;