import type { ReactNode } from "react";
import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  Radio as RACRadio,
  type RadioProps as RACRadioProps,
  type ValidationResult,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import "./RadioGroup.css";

export interface RadioGroupProps extends RACRadioGroupProps {
  /** The label for the radio group. */
  label?: string;

  /** A brief description shown below the group. */
  description?: string;

  /** An error message shown when the group is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);

  /** The radios in the group. */
  children?: ReactNode;
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RACRadioGroup {...props}>
      {label && <Label>{label}</Label>}
      <div className="radio-group-items">{children}</div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

export type RadioProps = RACRadioProps;

export function Radio(props: RadioProps) {
  return <RACRadio {...props} />;
}
