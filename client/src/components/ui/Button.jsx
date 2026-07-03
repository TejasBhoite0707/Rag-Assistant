import clsx from "clsx";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800",

        danger:
            "bg-red-600 hover:bg-red-700 text-white"
    };

    return (
        <button
            type={type}
            disabled={loading || disabled}
            className={clsx(
                "w-full rounded-lg px-4 py-2 font-medium transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
};

export default Button;