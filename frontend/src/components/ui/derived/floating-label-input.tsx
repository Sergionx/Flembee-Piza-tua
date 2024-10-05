import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { FieldValues, Path } from "react-hook-form";

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClassname?: string;
  labelClassName?: string;
};

export interface FloatingLabelInputFieldProps<T extends FieldValues>
  extends FloatingLabelInputProps {
  name: Path<T>;
  showErrors?: boolean;
  showColorsState?: boolean;
}

function FloatingLabelInputField<T extends FieldValues>({
  name,
  disabled,
  id,
  label,
  containerClassname,
  labelClassName,
  className,
  showErrors = false,
  showColorsState = true,
  ...props
}: FloatingLabelInputFieldProps<T>) {
  return (
    <FormField
      name={name}
      disabled={disabled}
      render={({ field: { ref, onChange, ...field }, fieldState }) => {
        const hasError = fieldState.invalid;
        const isSuccessful = !fieldState.invalid && fieldState.isTouched;

        return (
          <FormItem className={cn("relative", containerClassname)}>
            <FormControl>
              <Input
                className={cn(
                  "block h-auto pb-2.5 pt-5 w-full text-gray-900 border-gray-300 appearance-none outline-none focus:ring-0 focus:border-primary-500 peer",
                  {
                    "bg-destructive/10 border-destructive":
                      hasError && showColorsState,
                    "bg-success/10 border-success":
                      isSuccessful && showColorsState,
                    "opacity-60": props.readOnly,
                  },
                  className
                )}
                onChange={(e) => {
                  if (props.type === "number") {
                    onChange(Number(e.target.value));
                  } else {
                    onChange(e);
                  }
                }}
                placeholder={props.placeholder ?? " "}
                {...props}
                {...field}
              />
            </FormControl>

            <FormLabel
              className={cn(
                "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-500 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                {
                  "-translate-y-4 scale-75": props.placeholder,
                  "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4":
                    !props.placeholder,
                  "opacity-60": props.readOnly,
                },
                labelClassName
              )}
              showColorsState={showColorsState}
            >
              {label}
            </FormLabel>

            {showErrors && hasError && (
              <FormMessage className="text-destructive/80 text-sm mt-1">
                {fieldState.error?.message}
              </FormMessage>
            )}
          </FormItem>
        );
      }}
    />
  );
}

FloatingLabelInputField.displayName = "FloatingLabelInputField";

export { FloatingLabelInputField };
