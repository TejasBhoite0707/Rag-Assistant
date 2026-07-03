import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import clsx from "clsx";

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    full: "max-w-5xl"
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md",
    closeOnBackdrop = true,
    showCloseButton = true
}) => {

    useEffect(() => {

        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            document.body.style.overflow = "";

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => {

                if (closeOnBackdrop) {
                    onClose();
                }

            }}
        >

            <div
                className={clsx(
                    "w-full rounded-xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200",
                    sizeClasses[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        {title}

                    </h2>

                    {showCloseButton && (

                        <button
                            onClick={onClose}
                            className="rounded-md p-2 hover:bg-gray-100 transition"
                        >

                            <X size={20} />

                        </button>

                    )}

                </div>

                {/* Body */}

                <div className="p-6">

                    {children}

                </div>

                {/* Footer */}

                {footer && (

                    <div className="border-t px-6 py-4 bg-gray-50">

                        {footer}

                    </div>

                )}

            </div>

        </div>,

        document.body

    );

};

export default Modal;