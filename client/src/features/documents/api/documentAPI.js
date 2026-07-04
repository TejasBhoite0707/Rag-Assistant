import api from "../../../api/axios";

// ===============================
// Upload Document
// ===============================

export const uploadDocument = async ({
    workspaceId,
    file
}) => {

    const formData = new FormData();

    formData.append("workspace_id", workspaceId);
    formData.append("document", file);

    const response = await api.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

// ===============================
// Get Documents
// ===============================

export const getDocuments = async (workspaceId) => {

    const response = await api.get(
        `/documents/${workspaceId}`
    );

    return response.data.data;
};

// ===============================
// Delete Document
// ===============================

export const deleteDocument = async (documentId) => {

    const response = await api.delete(
        `/documents/${documentId}`
    );

    return response.data;
};

export const getDocumentUrl = (documentId) => {

    return `$/api/documents/view/${documentId}`;
}