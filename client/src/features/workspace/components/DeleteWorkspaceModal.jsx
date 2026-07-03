import { Button, Modal } from "../../../components/ui";

const DeleteWorkspaceModal = ({
    isOpen,
    onClose,
    workspace,
    onConfirm,
    isLoading
}) => {

    if (!workspace) return null;

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Workspace"
            size="sm"
        >

            <div className="space-y-6">

                <p className="text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}
                        {workspace.workspace_name}

                    </span>

                    ?

                </p>

                <p className="text-sm text-red-500">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-3">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        isLoading={isLoading}
                        onClick={() => onConfirm(workspace.id)}
                    >
                        Delete
                    </Button>

                </div>

            </div>

        </Modal>

    );

};

export default DeleteWorkspaceModal;