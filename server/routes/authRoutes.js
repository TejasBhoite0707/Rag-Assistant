const express=require("express");
const router=express.Router();

const {
register,
login,
logout
}=require("../controllers/authController.js")
const authenticateUser=require("../middleware/authMiddleware.js");

router.post("/register", register);

router.post("/login", login);

router.post(
    "/logout",
    authenticateUser,
    logout
);

module.exports = router;