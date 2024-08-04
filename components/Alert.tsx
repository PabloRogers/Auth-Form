import { FC, HTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertOctagon, AlertTriangle, Info } from "react-feather";
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const alertVariants = cva("", {
  variants: {
    variant: {
      default: "",
      info: "bg-indigo-700 bg-opacity-5 text-indigo-700 dark:bg-opacity-40 border-indigo-700 dark:text-neutral-200 dark:[&>svg]:text-white [&>svg]:text-indigo-700", //dark:bg-blue-950
      warning:
        "bg-amber-500 bg-opacity-5 border-amber-500 text-amber-500 [&>svg]:text-amber-500",
      error:
        "bg-red-500 bg-opacity-5 border-red-500 text-red-500 [&>svg]:text-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert: FC<AlertProps> = ({ variant, className, ...props }) => {
  return (
    <ShadcnAlert
      className={cn(alertVariants({ variant, className }))}
      {...props}
    ></ShadcnAlert>
  );
};

const AlertError: FC<AlertProps> = ({ children, ...props }) => {
  return (
    <Alert variant="error" {...props}>
      <AlertOctagon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

const AlertWarning: FC<AlertProps> = ({ children, ...props }) => {
  return (
    <Alert variant="warning" {...props}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

const AlertInfo: FC<AlertProps> = ({ children, ...props }) => {
  return (
    <Alert variant="info" {...props}>
      <Info className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
export {
  Alert,
  AlertError,
  AlertWarning,
  AlertInfo,
  AlertDescription,
  AlertTitle,
  alertVariants,
};
