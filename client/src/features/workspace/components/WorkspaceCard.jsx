import { FolderOpen, Trash2, CalendarDays } from "lucide-react";

const WorkspaceCard = ({
    workspace,
    onOpen,
    onDelete
}) => {

    const formattedDate = new Date(
        workspace.created_at
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (

        <div

            onClick={() => onOpen(workspace.id)}

            className="
                group
                cursor-pointer
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                flex
                flex-col
                justify-between
                h-60
            "

        >

            <div>

                <div
                    className="
                        w-14
                        h-14
                        rounded-xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                    "
                >

                    <FolderOpen
                        size={30}
                        className="text-blue-600"
                    />

                </div>

                <h2
                    className="
                        mt-5
                        text-xl
                        font-semibold
                        line-clamp-2
                        text-slate-900
                    "
                >

                    {workspace.workspace_name}

                </h2>

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-500
                    "
                >

                    <CalendarDays size={16} />

                    <span>

                        {formattedDate}

                    </span>

                </div>

            </div>

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mt-6
                "
            >

                <p
                    className="
                        text-sm
                        font-medium
                        text-blue-600
                    "
                >

                    Click to open →

                </p>

                <button

                    onClick={(e) => {

                        e.stopPropagation();

                        onDelete(workspace);

                    }}

                    className="
                        rounded-lg
                        p-2
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