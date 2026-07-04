import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getDocuments,
    uploadDocument,
    deleteDocument
} from "../api/documentAPI";

const useDocument = (workspaceId) => {

    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDocuments = async () => {

        if (!workspaceId) return;

        try {

            setIsLoading(true);

            const data = await getDocuments(workspaceId);

            setDocuments(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch documents."
            );

        } finally {

            setIsLoading(false);

        }

    };

    const upload = async (file) => {

        try {

            setIsLoading(true);

            await uploadDocument({
                workspaceId,
                file
            });

            toast.success("Document uploaded successfully.");

            await fetchDocuments();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Upload failed."
            );

        } finally {

            setIsLoading(false);

        }

    };

    const remove = async (documentId) => {

        try {

            setIsLoading(true);

            await deleteDocument(documentId);

            toast.success("Document deleted.");

            await fetchDocuments();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed."
            );

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {

        fetchDocuments();

    }, [workspaceId]);

    return {

        documents,

        isLoading,

        upload,

        remove,

        refresh: fetchDocuments

    };

};

export default useDocument;