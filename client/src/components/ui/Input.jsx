import { forwardRef } from "react";

const Input = forwardRef(({
    label,
    error,
    ...props
}, ref) => {

    return (

        <div className="space-y-1">

            {label && (

                <label className="text-sm font-medium">

                    {label}

                </label>

            )}

            <input
                ref={ref}
                {...props}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

            {error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

});

Input.displayName = "Input";

export default Input;