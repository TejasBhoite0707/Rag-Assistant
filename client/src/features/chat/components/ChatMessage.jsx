const ChatMessage = ({ message }) => {

    const isUser = message.role === "user";

    return (

        <div
            className={`flex mb-5 ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`
                    max-w-[80%]
                    px-5
                    py-3
                    rounded-2xl
                    shadow-sm
                    whitespace-pre-wrap
                    break-words
                    ${
                        isUser
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-900 rounded-bl-md"
                    }
                `}
            >

                {message.text}

            </div>

        </div>

    );

};

export default ChatMessage;