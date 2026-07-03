import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useWorkspace from "../hooks/useWorkspace";
import useModal from "../../../hooks/useModel";

import CreateWorkspaceCard from "./CreateWorkspaceCard";
import WorkspaceContent from "./WorkspaceContent";
import CreateWorkspaceModal from "./CreateWorkspaceModal";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";

const WorkspaceSection = () => {

    const navigate = useNavigate();

    const {
        workspaces,
        isLoading,
        createWorkspace,
        deleteWorkspace
    } = useWorkspace();

    // Create Workspace Modal
    const {
        isOpen: createModalOpen,
        openModal: openCreateModal,
        closeModal: closeCreateModal
    } = useModal();

    // Delete Workspace Modal
    const {
        isOpen: deleteModalOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal
    } = useModal();

    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    // ==========================
    // Open Workspace
    // ==========================

    const handleOpenWorkspace = (workspaceId) => {

        navigate(`/workspace/${workspaceId}`);

    };

    // ==========================
    // Create Workspace
    // ==========================

    const handleCreateWorkspace = async (data) => {

        try {

            await createWorkspace(data);

            toast.success("Workspace created successfully.");

            closeCreateModal();

            return true;

        } catch (error) {

            toast.error(error || "Unable to create workspace.");

            return false;

        }

    };

    // ==========================
    // Open Delete Modal
    // ==========================

    const handleDeleteClick = (workspace) => {

        setSelectedWorkspace(workspace);

        openDeleteModal();

    };

    // ==========================
    // Confirm Delete
    // ==========================

    const confirmDeleteWorkspace = async (workspaceId) => {

        try {

            await deleteWorkspace(workspaceId);

            toast.success("Workspace deleted successfully.");

            closeDeleteModal();

            setSelectedWorkspace(null);

        } catch (error) {

            toast.error(error || "Unable to delete workspace.");

        }

    };

    return (

        <>

            <div
                className="
                    grid
                    gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    mb-8
                "
            >

                <CreateWorkspaceCard
                    onClick={openCreateModal}
                />

            </div>

            <WorkspaceContent
                isLoading={isLoading}
                workspaces={workspaces}
                onOpen={handleOpenWorkspace}
                onDelete={handleDeleteClick}
            />

            <CreateWorkspaceModal
                isOpen={createModalOpen}
                onClose={closeCreateModal}
                onSubmit={handleCreateWorkspace}
                isLoading={isLoading}
            />

            <DeleteWorkspaceModal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                workspace={selectedWorkspace}
                onConfirm={confirmDeleteWorkspace}
                isLoading={isLoading}
            />

        </>

    );

};

export default WorkspaceSection;