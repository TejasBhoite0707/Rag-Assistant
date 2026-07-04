import { useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import WorkspaceSection from "../features/workspace/components/WorkspaceSection";

import { selectUser } from "../features/auth/store/authSelectors";

const Dashboard = () => {

    const user = useSelector(selectUser);

    return (

        <DashboardLayout title="Dashboard">

            

            <WorkspaceSection />

        </DashboardLayout>

    );

};

export default Dashboard;