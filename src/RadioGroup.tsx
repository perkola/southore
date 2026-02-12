import type { ReactNode } from "react";
import {
  RadioGroup as RACRadioGroup,
  type RadioGroupProps as RACRadioGroupProps,
  Radio as RACRadio,
  type RadioProps as RACRadioProps,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import type { FieldProps } from "./Field";
import "./Field.css";
import "./RadioGroup.css";

export interface RadioGroupProps extends RACRadioGroupProps, FieldProps {
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
