import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className="input w-full transition-all duration-200 hover:border-primary-200/50 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-destructive-100 text-sm mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
