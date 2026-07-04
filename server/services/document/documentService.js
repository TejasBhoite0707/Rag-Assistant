const pool = require("../../config/db.js");

const fs = require("fs");
const path = require("path");
const { pdfParse } = require("../../utils/pdfParser.js");
const { chunkText } = require("../rag/chunkService.js");
const { processDocument } = require("../rag/ragPipelineService.js");

const uploadDocumentService = async ({ workspace, file }) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const workspaceFolder = path.join(
            "uploads",
            workspace.id.toString()
        );

        if (!fs.existsSync(workspaceFolder)) {

            fs.mkdirSync(workspaceFolder, {
                recursive: true
            });

        }


        const newPath = path.join(
            workspaceFolder,
            file.filename
        );


        fs.renameSync(
            file.path,
            newPath
        );

        const result = await client.query(
            `
        INSERT INTO documents
        (
            workspace_id,
            file_name,
            original_name,
            file_path,
            mime_type,
            file_size
        )
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
            [
                workspace.id,
                file.filename,
                file.originalname,
                newPath,
                file.mimetype,
                file.size
            ]
        );

        const document = result.rows[0];
        console.log("📄 Parsing PDF...");
        const extractedText = await pdfParse(newPath);
        console.log("✅ PDF Parsed");

        console.log("✂️ Chunking Text...");


        const chunks = chunkText(extractedText);
        console.log("Total Chunks:", chunks.length);
        chunks.forEach((chunk, index) => {

            console.log(`\nChunk ${index + 1}`);

            `Chunk ${index + 1}: ${chunk.substring(0, 100)}...`

        });

        console.log("before process document");

        await processDocument({
            client,
            workspaceId: workspace.id,
            documentId: document.id,
            chunks
        });
        console.log("after process document");
        await client.query("COMMIT");
        return {
            document,
        }
    } catch (error) {
        await client.query("ROLLBACK");
        if (file && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        throw error;
    }
    finally {
        client.release();
    }

};

const getDocumentsService = async (workspaceId) => {

    const result = await pool.query(
        `
        SELECT
            id,
            workspace_id,
            original_name,
            file_name,
            file_size,
            mime_type,
            uploaded_at
        FROM documents
        WHERE workspace_id = $1
        ORDER BY uploaded_at DESC
        `,
        [workspaceId]
    );

    return result.rows;

};

const deleteDocumentService = async (documentId) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const result = await client.query(
            `
            SELECT *
            FROM documents
            WHERE id = $1
            `,
            [documentId]
        );

        if (result.rows.length === 0) {

            throw new Error("Document not found");

        }

        const document = result.rows[0];

        await client.query(
            `
            DELETE
            FROM document_chunks
            WHERE document_id = $1
            `,
            [documentId]
        );

        await client.query(
            `
            DELETE
            FROM documents
            WHERE id = $1
            `,
            [documentId]
        );

        if (
            document.file_path &&
            fs.existsSync(document.file_path)
        ) {

            fs.unlinkSync(document.file_path);

        }

        await client.query("COMMIT");

    } catch (error) {

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};

const viewDocumentService = async (documentId, userId) => {

    const result = await pool.query(
        `
        SELECT
            d.file_path,
            d.original_name
        FROM documents d
        INNER JOIN workspaces w
            ON d.workspace_id = w.id
        WHERE
            d.id = $1
            AND w.user_id = $2
        `,
        [documentId, userId]
    );

    if (result.rows.length === 0) {

        throw new Error("Document not found");

    }

    return result.rows[0];

};

module.exports = {
    uploadDocumentService,
    getDocumentsService,
    deleteDocumentService,
    viewDocumentService
};