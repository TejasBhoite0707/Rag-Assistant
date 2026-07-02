const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const generateEmbedding = async (input) => {

    if (Array.isArray(input)) {

        const embeddings = [];

        for (const text of input) {

            const response = await ai.models.embedContent({
                model: "gemini-embedding-2",
                contents: text
            });

            embeddings.push(response.embeddings[0].values);

        }

        return embeddings;
    }

    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: input
    });

    return response.embeddings[0].values;

};

module.exports = {
    generateEmbedding
};