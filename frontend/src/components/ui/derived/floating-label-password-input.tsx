import * as React from "react";
import type { FieldValues } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FloatingLabelInputFieldProps } from "./floating-label-input";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../button";

function FloatingLabelPasswordInput<T extends FieldValues>({
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
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormField
      name={name}
      disabled={disabled}
      render={({ field: { ref, onChange, ...field }, fieldState }) => {
        const hasError = fieldState.invalid;
        const isSuccessful = !fieldState.invalid && fieldState.isTouched;

        return (
          <FormItem className={cn("relative", containerClassname)}>
            <div className="relative">
              <FormControl>
                <Input
                  className={cn(
                    "block h-auto pb-2.5 pt-5 w-full text-gray-900 border-gray-300 appearance-none outline-none focus:ring-0 focus:border-primary-500 peer",
                    "hide-password-toggle pr-10",
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
                  type={showPassword ? "text" : "password"}
                />
              </FormControl>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
              >
                {showPassword && !disabled ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>

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

            <style>{`
            .hide-password-toggle::-ms-reveal,
            .hide-password-toggle::-ms-clear {
              visibility: hidden;
              pointer-events: none;
              display: none;
            }
				`}</style>
          </FormItem>
        );
      }}
    />
  );
}

FloatingLabelPasswordInput.displayName = "FloatingLabelPasswordInput";

export { FloatingLabelPasswordInput };
