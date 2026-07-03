import { useSelector } from "react-redux";

import { selectUser } from "../../features/auth/store/authSelectors";

const Header = ({
    title
}) => {

    const user = useSelector(selectUser);

    return (

        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">

            <h2 className="text-2xl font-semibold">

                {title}

            </h2>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="font-semibold">

                        {user?.name}

                    </p>

                    <p className="text-sm text-gray-500">

                        {user?.email}

                    </p>

                </div>

                <div
                    className="
                        h-10
                        w-10
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        font-semibold
                    "
                >

                    {user?.name?.charAt(0)?.toUpperCase()}

                </div>

            </div>

        </header>

    );

};

export default Header;