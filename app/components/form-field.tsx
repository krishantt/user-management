import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);
  return (
    <div className="space-y-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={htmlFor}
        name={htmlFor}
        type={type}
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        placeholder={placeholder}
        value={value}
      />
      {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}
