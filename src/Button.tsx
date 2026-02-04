import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import "./Button.css";

export interface ButtonProps extends RACButtonProps {
  /**
   * The visual style of the button.
   *
   * @default 'solid'
   */
  variant?: "solid" | "outlined" | "text";
}

export function Button({ variant = "solid", ...props }: ButtonProps) {
  return <RACButton {...props} data-variant={variant} />;
}
