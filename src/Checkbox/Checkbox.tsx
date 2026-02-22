import {
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
} from "react-aria-components";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<RACCheckboxProps, "children"> {
  /** The label for the checkbox. */
  children?: React.ReactNode;
}

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <RACCheckbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox-indicator">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={16} height={3} />
              ) : (
                <polyline points="2 9 7 14 16 4" />
              )}
            </svg>
          </div>
          {children && <span>{children}</span>}
        </>
      )}
    </RACCheckbox>
  );
}
