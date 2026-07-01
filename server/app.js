const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authenticateUser = require("./middleware/authMiddleware.js");
const authRoutes=require("./routes/authRoutes.js");
const workSpaceRoutes=require("./routes/workspaceRoutes.js");

const app=express();

app.use(cors({
      origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/workspaces",workSpaceRoutes);
app.get("/api/profile", authenticateUser, (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

});

module.exports=app;