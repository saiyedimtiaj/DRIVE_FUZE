import { Controller, useFormContext } from "react-hook-form"; // Import useFormContext
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  items: { name: string; value: string }[];
  disabled?: boolean;
  required?: boolean;
};

const CRSelect = ({
  name,
  label,
  placeholder,
  items,
  defaultValue,
  disabled = false,
  required = false,
}: Props) => {
  const { control } = useFormContext(); // Access control from form context

  return (
    <div>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field }) => (
          <Select
            required={required}
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value || defaultValue}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {items?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default CRSelect;
