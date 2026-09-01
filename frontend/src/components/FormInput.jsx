export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  as = "input",
  children,
  ...rest
}) {
  const fieldClass = `input-field ${error ? "input-error" : ""}`;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${fieldClass} min-h-[100px] resize-none`}
          {...rest}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={fieldClass}
          {...rest}
        >
          {children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={fieldClass}
          {...rest}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1.5 animate-fade-in">{error}</p>}
    </div>
  );
}
