const {
    uploadDocumentService
} = require("../services/document/documentService.js");

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

module.exports = {
    uploadDocument
};