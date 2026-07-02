const pool = require("../config/db.js");

const validateWorkspace = async (req, res, next) => {

    try {

        const { workspace_id } = req.body|| req.params|| req.query;

        console.log("Body:", req.body);
console.log("File:", req.file);
        if (!workspace_id) {
            return res.status(400).json({
                success: false,
                message: "workspace_id is required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM workspaces
             WHERE id = $1
             AND user_id = $2`,
            [
                workspace_id,
                req.user.id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(403).json({
                success: false,
                message: "Workspace not found or access denied"
            });

        }

        // Save workspace for later use
        req.workspace = result.rows[0];

        next();

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = validateWorkspace;