import { FileText, Trash2,ExternalLink  } from "lucide-react";
import { getDocumentUrl } from "../api/documentAPI";

const DocumentCard = ({
    document,
    onDelete
}) => {

    const formatFileSize = (bytes) => {

        if (bytes < 1024) return `${bytes} B`;

        if (bytes < 1024 * 1024) {

            return `${(bytes / 1024).toFixed(2)} KB`;

        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    };

    return (

        <div
            className="
                flex
                items-center
                justify-between
                rounded-lg
                border
                p-4
                hover:bg-gray-50
                transition
            "
        >

            <div className="flex items-center gap-4">

                <FileText
                    className="text-red-500"
                    size={28}
                />

                <div>

                    <h3 className="font-medium">

                        {document.original_name}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {formatFileSize(document.file_size)}

                    </p>

                </div>

            </div>

            
<div className="flex items-center gap-2">

    <button

        onClick={(e) => {

            e.stopPropagation();

            window.open(

                getDocumentUrl(document.id),

                "_blank"

            );

        }}

        className="
            rounded-lg
            p-2
            hover:bg-blue-50
        "

    >

        <ExternalLink

            size={18}

            className="text-blue-600"

        />

    </button>

    <button

        onClick={(e) => {

            e.stopPropagation();

            onDelete(document.id);

        }}

        className="
            rounded-lg
            p-2
            hover:bg-red-50
        "

    >

        <Trash2

            size={18}

            className="text-red-500"

        />

    </button>

</div>
        </div>

    );

};

export default DocumentCard;