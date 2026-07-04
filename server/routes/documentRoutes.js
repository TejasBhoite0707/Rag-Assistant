const express = require("express");

const router = express.Router();

const authenticateUser=require("../middleware/authMiddleware.js");

const upload=require("../middleware/uploadMiddleware.js");

const {uploadDocument,getDocuments,deleteDocument,viewDocument}=require("../controllers/documentsControllers.js");
const validateWorkspace = require("../middleware/workSpaceMiddleware.js");

router.post("/upload",authenticateUser,upload.single("document"),validateWorkspace,uploadDocument);
router.get(
    "/:workspaceId",
    authenticateUser,
    validateWorkspace,
    getDocuments
);
router.delete(
    "/:documentId",
    authenticateUser,
    deleteDocument
);
router.get(
    "/view/:documentId",
    authenticateUser,
    viewDocument
);

module.exports=router;

