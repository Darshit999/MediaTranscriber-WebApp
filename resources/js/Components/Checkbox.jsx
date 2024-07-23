export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-gray-900 border-2 border-gray-600 text-purple-600 focus:ring-0 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
