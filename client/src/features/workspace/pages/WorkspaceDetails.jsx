import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import useWorkspace from "../hooks/useWorkspace";

const WorkspaceDetails = () => {

    const { id } = useParams();

    const {

        getWorkspace,

        selectedWorkspace,

        isLoading

    } = useWorkspace();

    useEffect(() => {

        getWorkspace(id);

    }, [id]);

    if (isLoading) {

        return (

            <DashboardLayout title="Workspace">

                <div className="text-center py-20">

                    Loading...

                </div>

            </DashboardLayout>

        );

    }
console.log("Workspace ID:", id);
console.log("Selected Workspace:", selectedWorkspace);
console.log("Loading:", isLoading);
    return (

        <DashboardLayout
            title={selectedWorkspace?.workspace_name || "Workspace"}
        >

            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        {selectedWorkspace?.workspace_name}

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Created{" "}

                        {

                            new Date(

                                selectedWorkspace?.created_at

                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-8
                    "
                >

                    <div
                        className="
                            bg-white
                            rounded-xl
                            border
                            p-6
                            
                        "
                    >

                        <h2 className="text-xl font-semibold">

                            Documents

                        </h2>

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-xl
                            border
                            p-6
                            
                        "
                    >

                        <h2 className="text-xl font-semibold">

                            AI Assistant

                        </h2>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default WorkspaceDetails;