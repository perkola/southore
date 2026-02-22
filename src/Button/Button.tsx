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

  /**
   * The size of the button.
   *
   * @default 'medium'
   */
  size?: "small" | "medium";
}

export function Button({
  variant = "solid",
  size = "medium",
  ...props
}: ButtonProps) {
  return <RACButton {...props} data-variant={variant} data-size={size} />;
}
