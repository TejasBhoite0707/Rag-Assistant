const {
    uploadDocumentService,
    getDocumentsService,
    deleteDocumentService,
    viewDocumentService
} = require("../services/document/documentService.js");
const path = require("path");
const fs=require("fs");
const uploadDocument = async (req, res) => {

    try {

        const document = await uploadDocumentService({
            workspace:req.workspace,
            file:req.file
        }
            
        );

        return res.status(201).json({

            success: true,

            message: "Document uploaded successfully",

            data: document

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};



const getDocuments = async (req, res) => {

    try {

        const { workspaceId } = req.params;

        const documents = await getDocumentsService(workspaceId);

        return res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteDocument = async (req, res) => {

    try {

        await deleteDocumentService(req.params.documentId);

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const viewDocument = async (req, res) => {

    try {

        const document =
            await viewDocumentService(
                req.params.documentId,
                req.user.id
            );

        const absolutePath = path.resolve(document.file_path);

        console.log("DB Path:", document.file_path);
        console.log("Absolute Path:", absolutePath);
        console.log("Exists:", fs.existsSync(absolutePath));

        return res.sendFile(absolutePath);

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument,
    viewDocument
};