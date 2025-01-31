import { FieldError, UseFormRegister } from "react-hook-form";

interface FormValues {
  promptTemplate: string;
  keywords: string;
}

interface TextareaFieldProps {
  label: string;
  id: keyof FormValues;
  register: UseFormRegister<FormValues>;
  errorMessage?: FieldError | undefined;
  disabled: boolean;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  extraLabel?: React.ReactNode; // Para añadir elementos extra en el label
}

export default function TextareaField({
  register,
  disabled,
  id,
  label,
  defaultValue,
  errorMessage,
  extraLabel,
  required = false,
  placeholder = "",
}: TextareaFieldProps) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="flex gap-1 font-medium">
        {label}
        {extraLabel && (
          <pre className="bg-blue-100 px-1 rounded-lg text-blue-600">
            {extraLabel}
          </pre>
        )}
      </label>
      <textarea
        {...register(id)}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
      ></textarea>
      {errorMessage && (
        <span className="font-light text-sm text-red-800 pl-1">
          {errorMessage.message}
        </span>
      )}
    </div>
  );
}
