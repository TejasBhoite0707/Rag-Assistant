const pool = require("../../config/db.js");

const fs = require("fs");
const path = require("path");
const { pdfParse } = require("../../utils/pdfParser.js");

const uploadDocumentService = async ({workspace, file}) => {

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

    const result = await pool.query(
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

    const document= result.rows[0];
        const extractedText = await pdfParse(newPath);

console.log("exTEXT",extractedText);

return{
    document,
    extractedText,
}
};

module.exports = {
    uploadDocumentService
};