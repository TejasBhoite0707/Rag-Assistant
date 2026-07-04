import api from "../../../api/axios";

export const askQuestion = async ({
    workspaceId,
    question
}) => {

    const response = await api.post("/chat", {

        workspace_id: workspaceId,

        question

    });

    return response.data.data;

};