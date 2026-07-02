const { generateEmbedding } = require("./embeddingService.js");
const { saveDocumentChunks } = require("./vectorService.js");

const processDocument = async ({
    workspaceId,
    documentId,
    chunks
}) => {
        console.log("🚀 processDocument started");


    console.log("🧠 Generating Embeddings...");

    const embeddings = await generateEmbedding(chunks);

    console.log("✅ Embeddings Generated");

    console.log("💾 Saving Chunks...");

    await saveDocumentChunks({
        workspaceId,
        documentId,
        chunks,
        embeddings
    });

    console.log("✅ Chunks Saved");

};

module.exports = {
    processDocument
};