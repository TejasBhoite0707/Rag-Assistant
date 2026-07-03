import { FolderOpen, Trash2 } from "lucide-react";

const WorkspaceCard = ({
    workspace,
    onOpen,
    onDelete
}) => {

    return (

        <div
            onClick={() => onOpen(workspace.id)}
            className="
                group
                cursor-pointer
                rounded-xl
                bg-white
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
                border
                border-gray-200
                p-6
                flex
                flex-col
                justify-between
                h-60
            "
        >

            <div>

                <FolderOpen
                    size={42}
                    className="text-blue-600"
                />

                <h2 className="mt-5 text-xl font-semibold line-clamp-2">

                    {workspace.workspace_name}

                </h2>

                <p className="mt-3 text-sm text-gray-500">

                    Created {" "}
                    {new Date(
                        workspace.created_at
                    ).toLocaleDateString()}

                </p>

            </div>

            <div className="flex justify-end">

                <button

                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(workspace);

                    }}

                    className="
                        rounded-lg
                        p-3
                        hover:bg-red-50
                        transition
                    "

                >

                    <Trash2
                        size={20}
                        className="text-red-500"
                    />

                </button>

            </div>

        </div>

    );

};

export default WorkspaceCard;