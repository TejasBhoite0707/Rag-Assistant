const {
    createWorkspaceService,
    updateWorkspaceService,
    deleteWorkspaceService,
    getWorkspacesService,
    getWorkspaceByIdService
} = require("../services/workspace/workspaceService.js");

const createWorkspace = async (req, res) => {

    try {

        const { workspace_name } = req.body;

        if (!workspace_name) {
            return res.status(400).json({
                success: false,
                message: "Workspace name is required"
            });
        }

        const workspace = await createWorkspaceService(
            workspace_name,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const getWorkspaces = async (req, res) => {

    try {

        const workspaces = await getWorkspacesService(req.user.id);

        return res.status(200).json({
            success: true,
            count: workspaces.length,
            data: workspaces
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const getWorkspaceById = async (req, res) => {

    try {

        const workspace = await getWorkspaceByIdService(
            req.params.id,
            req.user.id
        );

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: workspace
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

const updateWorkspace = async (req, res) => {

    try {

        const { workspace_name } = req.body;

        const workspace = await updateWorkspaceService(
            req.params.id,
            req.user.id,
            workspace_name
        );

        return res.status(200).json({
            success: true,
            message: "Workspace updated successfully",
            data: workspace
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

const deleteWorkspace = async (req, res) => {

    try {

        await deleteWorkspaceService(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Workspace deleted successfully"
        });

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    createWorkspace,
    getWorkspaces,
    updateWorkspace,
    deleteWorkspace,
    getWorkspaceById
};