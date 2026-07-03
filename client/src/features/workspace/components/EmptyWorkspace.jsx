import { FolderOpen } from "lucide-react";

const EmptyWorkspace = () => {

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
                py-24
            "
        >

            <FolderOpen
                size={80}
                className="text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-semibold">

                No Workspaces Found

            </h2>

            <p className="mt-2 text-gray-500">

                Create your first workspace to begin chatting with your documents.

            </p>

        </div>

    );

};

export default EmptyWorkspace;