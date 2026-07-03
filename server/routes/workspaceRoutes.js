const express = require("express");

const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware.js");

const{createWorkspace,getWorkspaces,updateWorkspace,deleteWorkspace,getWorkspaceById}=require("../controllers/workspaceController.js");

router.post("/",authenticateUser,createWorkspace);
router.get("/",authenticateUser,getWorkspaces);
router.put("/:id",authenticateUser,updateWorkspace);
router.delete("/:id",authenticateUser,deleteWorkspace);
router.get("/:id", authenticateUser, getWorkspaceById);

module.exports=router;