import {
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps as RACToggleButtonGroupProps,
  ToggleButton as RACToggleButton,
  type ToggleButtonProps as RACToggleButtonProps,
} from "react-aria-components";
import "./ToggleButtonGroup.css";

export interface ToggleButtonGroupProps extends RACToggleButtonGroupProps {
  size?: "medium" | "small";
}
export type ToggleButtonProps = RACToggleButtonProps;

export function ToggleButtonGroup({ size = "medium", ...props }: ToggleButtonGroupProps) {
  return <RACToggleButtonGroup data-size={size} {...props} />;
}

export function ToggleButton(props: ToggleButtonProps) {
  return <RACToggleButton {...props} />;
}

ToggleButtonGroup.displayName = "ToggleButtonGroup";
ToggleButton.displayName = "ToggleButton";
