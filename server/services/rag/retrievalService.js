const pool = require("../../config/db.js");
const { generateEmbedding } = require("./embeddingService.js");

const retrieveContext = async ({
    workspaceId,
    question
}) => {

    const questionEmbedding =
        await generateEmbedding(question);

    const result = await pool.query(
    `
    SELECT
        chunk_text,
        embedding <=> $1::vector AS distance
    FROM document_chunks
    WHERE workspace_id = $2
    ORDER BY embedding <=> $1::vector
    LIMIT 5
    `,
    [
        JSON.stringify(questionEmbedding),
        workspaceId
    ]
);

    return result.rows;

};

module.exports = {
    retrieveContext
};