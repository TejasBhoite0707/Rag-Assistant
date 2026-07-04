const express=require("express");
const cors=require("cors");
const path = require("path");
const cookieParser=require("cookie-parser");
const authenticateUser = require("./middleware/authMiddleware.js");
const authRoutes=require("./routes/authRoutes.js");
const workSpaceRoutes=require("./routes/workspaceRoutes.js");
const documentRoutes=require("./routes/documentRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const chatRoutes=require("./routes/chatRoutes.js")
const app=express();

app.use(cors({
      origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/workspaces",workSpaceRoutes);
app.use("/api/documents",documentRoutes);
app.use("/api/test", testRoutes);
app.use("/api/chat",chatRoutes);



app.get("/api/profile", authenticateUser, (req, res) => {

    res.json({
        success: true,
        user: req.user
    });

});

app.use(express.static(path.join(__dirname,"../client/dist")));

app.use( (req, res) => {

    res.sendFile(
        path.join(__dirname, "../client/dist/index.html")
    );

});

module.exports=app;