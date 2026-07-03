import WorkspaceCard from "./WorkspaceCard";

const WorkspaceGrid = ({
    workspaces,
    onOpen,
    onDelete
}) => {

    return (

        <div
            className="
                grid
                gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
            "
        >

            {

                workspaces.map((workspace) => (

                    <WorkspaceCard

                        key={workspace.id}

                        workspace={workspace}

                        onOpen={onOpen}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

};

export default WorkspaceGrid;