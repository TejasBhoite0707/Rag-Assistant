import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = ({
    title,
    children
}) => {

    return (

        <div className="h-screen flex bg-slate-100">

            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Header title={title} />

                <main className="flex-1 overflow-y-auto p-6">

                    {children}

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;