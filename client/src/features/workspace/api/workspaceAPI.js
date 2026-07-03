import api from "../../../api/axios";

// ===============================
// Get All Workspaces
// ===============================

export const getWorkspaces = async () => {
    const response = await api.get("/workspaces");
    return response.data.data;
};

// ===============================
// Create Workspace
// ===============================

export const createWorkspace = async (workspaceData) => {
    const response = await api.post("/workspaces", workspaceData);
    return response.data.data;
};

// ===============================
// Delete Workspace
// ===============================

export const deleteWorkspace = async (workspaceId) => {
    const response = await api.delete(`/workspaces/${workspaceId}`);
    return workspaceId;
};

// ===============================
// Get Workspace By Id
// ===============================

export const getWorkspaceById = async (workspaceId) => {
    const response = await api.get(`/workspaces/${workspaceId}`);
    return response.data.data;
};