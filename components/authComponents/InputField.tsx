/**
 * Renders an input field with the specified properties.
 *
 * @param {string} id - The unique identifier for the input field.
 * @param {string} name - The name or label of the input field.
 * @param {string} type - The type of the input field (e.g., "text", "password").
 * @param {string} value - The current value of the input field.
 * @param {string} autoComplete - The autocomplete behavior for the input field.
 * @param {boolean} required - Indicates if the input field is required.
 * @param {string} className - Additional CSS classes to apply to the input field.
 * @param {function} onChange - The callback function to handle input changes.
 * @returns {JSX.Element} - The rendered input field.
 */
const InputField = ({ id, name, type, value, autoComplete, required, className, onChange }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-white">
                {name}
            </label>
            <div className="mt-2">
                <input id={id} name={name} type={type} value={value} autoComplete={autoComplete} required={required} className={className} onChange={onChange} />
            </div>
        </div>
    )
}
export default InputField
