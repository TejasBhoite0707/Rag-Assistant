const pool = require("../../config/db.js");

const saveDocumentChunks = async ({
    workspaceId,
    documentId,
    chunks,
    embeddings
}) => {

    console.log("Started working");

    for (let i = 0; i < chunks.length; i++) {

        try {

            console.log("Saving chunk:", i);

            await pool.query(
                `
    INSERT INTO document_chunks
    (
        workspace_id,
        document_id,
        chunk_index,
        chunk_text,
        embedding
    )
    VALUES($1,$2,$3,$4,$5::vector)
    `,
                [
                    workspaceId,
                    documentId,
                    i,
                    chunks[i],
                    JSON.stringify(embeddings[i])   // ✅ becomes [ ... ]
                ]
            );

            console.log("Chunk saved:", i);

        } catch (err) {

            console.error("Insert Error:", err);

            throw err;
        }

    }


};

module.exports = {
    saveDocumentChunks
};