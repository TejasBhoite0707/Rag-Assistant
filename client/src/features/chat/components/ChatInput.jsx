import { useState } from "react";

const ChatInput = ({
    onSend,
    isLoading
}) => {

    const [question, setQuestion] = useState("");

    const handleSubmit = () => {

        if (!question.trim()) return;

        onSend(question);

        setQuestion("");

    };

    return (

        <div
            className="
                border-t
                p-4
                flex
                gap-3
            "
        >

            <input

                type="text"

                value={question}

                onChange={(e) =>
                    setQuestion(e.target.value)
                }

                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        handleSubmit();

                    }

                }}

                placeholder="Ask anything about your documents..."

                className="
        flex-1
        rounded-xl
        border
        border-gray-300
        px-5
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
    "

            />

           <button

    onClick={handleSubmit}

    disabled={isLoading}

    className="
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        transition
        disabled:opacity-50
    "

>

    Send

</button>

        </div>

    );

};

export default ChatInput;