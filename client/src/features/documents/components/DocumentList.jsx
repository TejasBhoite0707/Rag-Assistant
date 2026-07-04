import DocumentCard from "./DocumentCard";

const DocumentList = ({
    documents,
    onDelete
}) => {

    if (documents.length === 0) {

        return (

            <div
                className="
                    text-center
                    text-gray-400
                    py-16
                "
            >

                No documents uploaded yet.

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {

                documents.map((document) => (

                    <DocumentCard

                        key={document.id}

                        document={document}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

};

export default DocumentList;