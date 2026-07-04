import { Upload } from "lucide-react";

const UploadDocument = ({
    onUpload,
    isLoading
}) => {

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        onUpload(file);

        e.target.value = "";

    };

    return (

        <label
            className="
                flex
                items-center
                justify-center
                gap-3
                rounded-lg
                border-2
                border-dashed
                border-blue-300
                bg-blue-50
                hover:bg-blue-100
                cursor-pointer
                py-8
                transition
            "
        >

            <Upload
                size={24}
                className="text-blue-600"
            />

            <span className="font-medium">

                {

                    isLoading

                        ? "Uploading..."

                        : "Upload PDF"

                }

            </span>

            <input
                type="file"
                accept=".pdf"
                hidden
                disabled={isLoading}
                onChange={handleFileChange}
            />

        </label>

    );

};

export default UploadDocument;