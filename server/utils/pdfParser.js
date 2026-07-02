const fs=require("fs");
const pdf = require("pdf-parse");

const pdfParse=async(filePath)=>{
    const buffer=fs.readFileSync(filePath);

    const pdfData=await pdf(buffer);
    return pdfData.text;

}

module.exports={pdfParse};