import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";
import useDocument from "../../documents/hooks/useDocument";

import UploadDocument from "../../documents/components/UploadDocument";
import DocumentList from "../../documents/components/DocumentList";
import useWorkspace from "../hooks/useWorkspace";
import ChatSection from "../../chat/components/ChatSection";
const WorkspaceDetails = () => {

    const { id } = useParams();

    const {

        getWorkspace,

        selectedWorkspace,

        isLoading

    } = useWorkspace();

    const {

        documents,

        upload,

        remove,

        isLoading: documentLoading

    } = useDocument(id);
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

                        <h2 className="text-xl font-semibold mb-6">

                            Documents

                        </h2>

                        <UploadDocument

                            onUpload={upload}

                            isLoading={documentLoading}

                        />

                        <div className="mt-6">

                            <DocumentList

                                documents={documents}

                                onDelete={remove}

                            />

                        </div>

                    </div>

                    <ChatSection/>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default WorkspaceDetails;