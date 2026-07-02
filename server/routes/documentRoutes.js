const express = require("express");

const router = express.Router();

const authenticateUser=require("../middleware/authMiddleware.js");

const upload=require("../middleware/uploadMiddleware.js");

const {uploadDocument}=require("../controllers/documentsControllers.js");
const validateWorkspace = require("../middleware/workSpaceMiddleware.js");

router.post("/upload",authenticateUser,upload.single("document"),validateWorkspace,uploadDocument);

module.exports=router;

