import DashboardLayout from "../layouts/DashboardLayout";

import WorkspaceSection from "../features/workspace/components/WorkspaceSection";

const Dashboard = () => {

    return (

        <DashboardLayout
            title="Dashboard"
        >

            <WorkspaceSection />

        </DashboardLayout>

    );

};

export default Dashboard;