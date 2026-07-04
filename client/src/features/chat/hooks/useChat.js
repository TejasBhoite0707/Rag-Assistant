import { useState } from "react";

import { askQuestion } from "../api/chatAPI";

const useChat = (workspaceId) => {

    const [messages, setMessages] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (question) => {

        if (!question.trim()) return;

        const userMessage = {

            role: "user",

            text: question

        };

        setMessages((prev) => [

            ...prev,

            userMessage

        ]);

        try {

            setIsLoading(true);

            const response = await askQuestion({

                workspaceId,

                question

            });

            setMessages((prev) => [

                ...prev,

                {

                    role: "assistant",

                    text: response.answer,

                    matches: response.matches

                }

            ]);

        } catch (error) {

            setMessages((prev) => [

                ...prev,

                {

                    role: "assistant",

                    text: "Something went wrong."

                }

            ]);

        } finally {

            setIsLoading(false);

        }

    };

    return {

        messages,

        sendMessage,

        isLoading

    };

};

export default useChat;