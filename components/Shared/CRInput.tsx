import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  type?: "text" | "number" | "email" | "date" | "datetime-local" | "url";
  disabled?: boolean;
  onlyRead?: boolean;
  isNeedLabelShow?: boolean;
};

const CRInput = ({
  name,
  label,
  placeholder = "",
  required = false,
  defaultValue = "",
  type = "text",
  disabled = false,
  onlyRead = false,
  isNeedLabelShow = true,
}: TProps) => {
  const { register } = useFormContext();
  return (
    <div>
      {isNeedLabelShow && <Label htmlFor={name}>{label}</Label>}
      <Input
        className="mt-1 w-full"
        {...register(name)}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        type={type}
        disabled={disabled}
        readOnly={onlyRead}
      />
    </div>
  );
};

export default CRInput;
