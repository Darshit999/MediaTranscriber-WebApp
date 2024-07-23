import React from "react";

export default function NewSecondaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex justify-center items-center w-full py-2 space-x-2 rounded-lg text-secondary bg-primary hover:bg-primary-hover transition ease-in-out duration-200 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
