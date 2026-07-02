const pool = require("../../config/db.js");

const createWorkspaceService = async (workspaceName, userId) => {

    const result = await pool.query(
        `INSERT INTO workspaces(user_id, workspace_name)
         VALUES($1,$2)
         RETURNING *`,
        [userId, workspaceName]
    );

    return result.rows[0];
};

const getWorkspacesService = async (userId) => {

    const result = await pool.query(
        `SELECT *
         FROM workspaces
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [userId]
    );

    return result.rows;
};

const updateWorkspaceService = async (workspaceId, userId, workspace_name) => {

    const result = await pool.query(
        `UPDATE workspaces
         SET workspace_name = $1
         WHERE id = $2
         AND user_id = $3
         RETURNING *`,
        [workspace_name, workspaceId, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("Workspace not found");
    }

    return result.rows[0];
};

const deleteWorkspaceService = async (workspaceId, userId) => {

    const result = await pool.query(
        `DELETE FROM workspaces
         WHERE id = $1
         AND user_id = $2
         RETURNING *`,
        [workspaceId, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("Workspace not found");
    }

    return result.rows[0];
};

module.exports = {
    createWorkspaceService,
    getWorkspacesService,
    updateWorkspaceService,
    deleteWorkspaceService
};