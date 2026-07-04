import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";

const ChatMessages = ({
    messages,
    isLoading
}) => {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, isLoading]);

    return (

        <div
            className="
                flex-1
                overflow-y-auto
                space-y-4
                p-4
            "
        >

            {

                messages.length === 0 && (

                    <div
                        className="
                            h-full
                            flex
                            items-center
                            justify-center
                            text-gray-400
                        "
                    >

                        Ask anything about your documents.

                    </div>

                )

            }

            {

                messages.map((message, index) => (

                    <ChatMessage

                        key={index}

                        message={message}

                    />

                ))

            }

            {

                isLoading && (

                   <div className="flex justify-start mb-5">

    <div
        className="
            bg-gray-100
            rounded-2xl
            rounded-bl-md
            px-5
            py-3
            shadow-sm
            text-gray-500
            animate-pulse
        "
    >

        🤖 Thinking...

    </div>

</div>

                )

            }

            <div ref={bottomRef} />

        </div>

    );

};

export default ChatMessages;