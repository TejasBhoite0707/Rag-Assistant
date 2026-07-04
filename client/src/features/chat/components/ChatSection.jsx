import { useParams } from "react-router-dom";

import useChat from "../hooks/useChat";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatSection = () => {

    const { id } = useParams();

    const {

        messages,

        sendMessage,

        isLoading

    } = useChat(id);

    return (

        <div
            className="
                bg-white
                rounded-xl
                border
                flex
                flex-col
                h-[650px]
            "
        >

            <div
                className="
        border-b
        px-6
        py-5
        bg-white
        rounded-t-xl
    "
            >

                <h2 className="font-bold text-xl">

                    🤖 AI Assistant

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    Ask questions about your uploaded documents.

                </p>

            </div>

            <ChatMessages

                messages={messages}

                isLoading={isLoading}

            />

            <ChatInput

                onSend={sendMessage}

                isLoading={isLoading}

            />

        </div>

    );

};

export default ChatSection;