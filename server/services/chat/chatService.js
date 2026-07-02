const { GoogleGenAI } = require("@google/genai");
const { retrieveContext } = require("../rag/retrievalService.js");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const askQuestion = async ({
    workspaceId,
    question
}) => {

    const matches = await retrieveContext({
        workspaceId,
        question
    });

    const context = matches
        .map(match => match.chunk_text)
        .join("\n\n");

    const prompt = `
You are a helpful AI assistant.

Answer ONLY from the provided context.

If the answer is not present in the context, reply:
"I couldn't find that information in the uploaded documents."

Context:
${context}

Question:
${question}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return {
        answer: response.text,
        matches
    };

};

module.exports = {
    askQuestion
};