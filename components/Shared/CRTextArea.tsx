import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  onlyRead?: boolean;
};

const CRTextArea = ({
  name,
  label,
  placeholder = "",
  required = false,
  defaultValue = "",
  disabled = false,
  onlyRead = false,
}: TProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        className="mt-2 w-full"
        {...register(name)}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={onlyRead}
      />
    </div>
  );
};

export default CRTextArea;
