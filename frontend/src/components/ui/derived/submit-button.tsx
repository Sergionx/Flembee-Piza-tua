import { cn } from "@/lib/utils";

import { Button } from "../button";
import { Spinner } from "../spinner";

interface Props extends Omit<React.ComponentProps<typeof Button>, "type"> {
  isSubmitting: boolean;
}

export default function SubmitButton({
  isSubmitting,
  disabled,
  children,
  className,
  ...props
}: Props) {
  return (
    <Button
      type="submit"
      className={cn("gap-x-2", className)}
      disabled={isSubmitting || disabled}
      {...props}
    >
      <Spinner className="text-white" show={isSubmitting} />
      {children}
    </Button>
  );
}
