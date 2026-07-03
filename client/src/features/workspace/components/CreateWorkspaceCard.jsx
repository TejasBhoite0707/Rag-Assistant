import { Plus } from "lucide-react";

const CreateWorkspaceCard = ({
    onClick
}) => {

    return (

        <div

            onClick={onClick}

            className="
                cursor-pointer
                rounded-xl
                border-2
                border-dashed
                border-blue-300
                bg-blue-50
                hover:bg-blue-100
                transition-all
                duration-300
                h-60
                flex
                flex-col
                justify-center
                items-center
            "

        >

            <Plus
                size={54}
                className="text-blue-600"
            />

            <h2 className="mt-5 text-xl font-semibold">

                Create Workspace

            </h2>

        </div>

    );

};

export default CreateWorkspaceCard;