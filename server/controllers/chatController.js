const { askQuestion } = require("../services/chat/chatService.js");

const chat = async (req, res) => {

    try {

        const result = await askQuestion({
            workspaceId: req.body.workspace_id,
            question: req.body.question
        });

        return res.json({
            success: true,
            data: result
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    chat
};