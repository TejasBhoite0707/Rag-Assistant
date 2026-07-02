const express = require("express");

const router = express.Router();

const { generateEmbedding } = require("../services/rag/embeddingService.js");
const { retrieveContext } = require("../services/rag/retrievalService.js");
router.get("/embedding", async (req, res) => {
    try {
        const embedding = await generateEmbedding("Hello World");

        console.log("Embedding Length:", embedding.length);

        res.json({
            success: true,
            embeddingLength: embedding.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/search", async (req, res) => {
    try {
        const { workspace_id, question } = req.body;

        const chunks = await retrieveContext({
            workspaceId: workspace_id,
            question
        });

        res.json(chunks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;