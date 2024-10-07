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
import type { AutoCompleteProps } from "./autocomplete";
import AutoComplete from "./autocomplete";
import { useState } from "react";

export interface AutocompleteInputFieldProps<T extends FieldValues>
  extends AutoCompleteProps {
  name: Path<T>;
  showErrors?: boolean;
  showColorsState?: boolean;

  containerClassname?: string;
  label: string;
  labelClassName?: string;
}

function AutocompleteInputField<T extends FieldValues>({
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
}: AutocompleteInputFieldProps<T>) {
  return (
    <FormField
      name={name}
      disabled={disabled}
      render={({ field: { ref, onBlur, ...field }, fieldState }) => {
        const hasError = fieldState.invalid;
        const isSuccessful =
          !fieldState.invalid && fieldState.isTouched && fieldState.isDirty;

        const [filterValue, setFilterValue] = useState("");
        const [focused, setFocused] = useState(false);

        return (
          <FormItem className={cn("relative", containerClassname)}>
            <FormControl>
              <AutoComplete
                listRelativeContainerClassName="z-[99]"
                className="peer/hola"
                inputWrapperClassName={cn(
                  "pb-1 pt-2 text-sm",
                  {
                    "bg-destructive/10 border-destructive":
                      hasError && showColorsState,
                    "bg-success/10 border-success":
                      isSuccessful && showColorsState,
                    "opacity-60": props.readOnly,
                  },
                  className
                )}
                placeholder={props.placeholder ?? " "}
                {...props}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                  onBlur();
                }}
                onFilterChange={setFilterValue}
                {...field}
              />
            </FormControl>

            <FormLabel
              className={cn(
                "absolute text-sm duration-300 transform -translate-y-4 translate-x-7 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary-500 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
                {
                  "-translate-y-4 scale-75": props.placeholder,
                  "scale-75 -translate-y-4 translate-x-7":
                    !props.placeholder &&
                    (!!field.value || !!filterValue || focused),
                  "scale-100  translate-y-0":
                    !props.placeholder &&
                    !field.value &&
                    !filterValue &&
                    !focused,

                  "opacity-60": props.readOnly,
                },
                "peer-placeholder-shown/hola:bg-orange-400",
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

AutocompleteInputField.displayName = "AutocompleteInputField";

export { AutocompleteInputField };
