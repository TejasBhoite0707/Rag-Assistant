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

module.exports = {
    uploadDocumentService
};