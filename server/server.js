require("dotenv").config();
require("./config/db.js");
const app=require("./app.js");

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running On Port ${PORT}`);
    
})