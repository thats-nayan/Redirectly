const TextField = ({
  label, // Label for the input field
  id, // ID for the input field
  type, // Type of the input field (e.g., text, email, url)
  errors, // Object containing validation errors
  register, // Function to register the input field for validation
  required, // Boolean indicating if the field is required
  message, // Error message to display if validation fails
  className, // Additional CSS classes for styling
  min, // Minimum length for the input field
  value, // Value of the input field
  placeholder, // Placeholder text for the input field
  variant, // Variant to determine specific validation rules (e.g., 'register' or 'login')
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`${className ? className : ""} font-semibold text-md  `}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${className ? className : ""
          } px-2 py-2 border   outline-none bg-transparent  text-slate-700 rounded-md ${errors[id]?.message ? "border-red-500" : "border-slate-600"
          }`}
        {...register(id, {
          required: { value: required, message },

          minLength: variant === "register"
            ? type === "username"
              ? { value: 3, message: "Username must be at least 3 characters" }
              : type === "password"
                ? { value: 8, message: "Password must be at least 8 characters" }
                : min
                  ? { value: min, message: `Minimum ${min} character${min > 1 ? 's' : ''} is required` }
                  : undefined
            : undefined,

          pattern:
            variant === "register"
              ? type === "username"
                ? {
                  value: /^[a-zA-Z0-9_]{3,20}$/,
                  message:
                    "Username must be 3–20 characters, only letters, numbers, and underscores",
                }
                : type === "email"
                  ? {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  }
                  : type === "password"
                    ? {
                      value:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,64}$/,
                      message:
                        "Password must contain at least one uppercase, lowercase, digit, and special character",
                    }
                    : type === "url"
                      ? {
                        value:
                          /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                        message: "Please enter a valid url",
                      }
                      : null
              : null,

        })}


      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default TextField;