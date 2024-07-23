export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `flex justify-center items-center py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase outline-none disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
