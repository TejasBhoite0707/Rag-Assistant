import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input, Modal } from "../../../components/ui";

const CreateWorkspaceModal = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading
}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            workspace_name: ""
        }
    });

    useEffect(() => {

        if (!isOpen) {

            reset();

        }

    }, [isOpen, reset]);

    const submitHandler = async (data) => {

        const success = await onSubmit(data);

        if (success) {

            reset();

        }

    };

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Workspace"
            size="md"
        >

            <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-5"
            >

                <Input

                    label="Workspace Name"

                    placeholder="Enter workspace name"

                    {...register("workspace_name", {

                        required: "Workspace name is required",

                        minLength: {

                            value: 3,

                            message:
                                "Minimum 3 characters"

                        },

                        maxLength: {

                            value: 50,

                            message:
                                "Maximum 50 characters"

                        }

                    })}

                    error={errors.workspace_name?.message}

                />

                <div className="flex justify-end gap-3">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >

                        Cancel

                    </Button>

                    <Button

                        type="submit"

                        isLoading={isLoading}

                    >

                        Create Workspace

                    </Button>

                </div>

            </form>

        </Modal>

    );

};

export default CreateWorkspaceModal;