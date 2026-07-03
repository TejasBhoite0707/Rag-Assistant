import { Loader } from "../../../components/ui";

import EmptyWorkspace from "./EmptyWorkspace";
import WorkspaceGrid from "./WorkspaceGrid";

const WorkspaceContent = ({
    isLoading,
    workspaces,
    onOpen,
    onDelete
}) => {

    if (isLoading) {

        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        );

    }

    if (workspaces.length === 0) {

        return <EmptyWorkspace />;

    }

    return (

        <WorkspaceGrid
            workspaces={workspaces}
            onOpen={onOpen}
            onDelete={onDelete}
        />

    );

};

export default WorkspaceContent;