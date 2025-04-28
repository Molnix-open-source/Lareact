import { InputProp } from "@/types";

type TextInputProp = React.InputHTMLAttributes<HTMLInputElement> & InputProp;

export default function Input({
    label,
    errorMessage = null,
    className = "",
    required = false,
    wide = false,
    ...props
}: TextInputProp) {
    const wideClass = wide ? "w-full" : "";
    return (
        <fieldset className="fieldset">
            {label && (
                <legend className="fieldset-legend">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </legend>
            )}
            <input
                {...props}
                required={required}
                className={`input w-full bg-base-100 read-only:bg-base-200 ${className} ${wideClass} ${
                    errorMessage ? "input-error" : ""
                }`}
            />
            {errorMessage && (
                <p className="fieldset-label text-error">{errorMessage}</p>
            )}
        </fieldset>
    );
}
