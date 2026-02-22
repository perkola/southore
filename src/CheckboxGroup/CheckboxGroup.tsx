import type { ReactNode } from "react";
import {
  CheckboxGroup as RACCheckboxGroup,
  type CheckboxGroupProps as RACCheckboxGroupProps,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import type { FieldProps } from "../shared/Field";
import "../shared/Field.css";
import "./CheckboxGroup.css";

export interface CheckboxGroupProps extends RACCheckboxGroupProps, FieldProps {
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
