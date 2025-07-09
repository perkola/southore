import React, { forwardRef, useRef } from "react";
import { useButton } from "react-aria";
import { tv } from "tailwind-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const ButtonVariants = tv({
  base: "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef =
      (ref as React.RefObject<HTMLButtonElement>) || internalRef;
    let { children, variant } = props;
    const { buttonProps } = useButton(props, buttonRef);

    return (
      <button
        {...buttonProps}
        ref={buttonRef}
        {...props}
        className={ButtonVariants({ variant: variant })}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
