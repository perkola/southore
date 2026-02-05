import type { ReactNode } from "react";
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
  type ValidationResult,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import "./CheckboxGroup.css";

export interface CheckboxGroupProps extends RACCheckboxGroupProps {
  /** The label for the checkbox group. */
  label?: string;

  /** A brief description shown below the group. */
  description?: string;

  /** An error message shown when the group is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);

  /** The checkboxes in the group. */
  children?: ReactNode;
}

export function CheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <RACCheckboxGroup {...props}>
      {label && <Label>{label}</Label>}
      <div className="checkbox-group-items">{children}</div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACCheckboxGroup>
  );
}
