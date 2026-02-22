import {
  Switch as RACSwitch,
  type SwitchProps as RACSwitchProps,
} from "react-aria-components";
import "./Switch.css";

export interface SwitchProps extends Omit<RACSwitchProps, "children"> {
  /** The label for the switch. */
  children?: React.ReactNode;
}

export function Switch({ children, ...props }: SwitchProps) {
  return (
    <RACSwitch {...props}>
      <div className="switch-track">
        <div className="switch-handle" />
      </div>
      {children && <span>{children}</span>}
    </RACSwitch>
  );
}

Switch.displayName = "Switch";
