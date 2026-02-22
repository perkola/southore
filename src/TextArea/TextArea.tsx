import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  TextArea as RACTextArea,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import type { FieldProps } from "../shared/Field";
import "../shared/Field.css";
import "./TextArea.css";

export interface TextAreaProps extends RACTextFieldProps, FieldProps {
  /** Placeholder text shown when the textarea is empty. */
  placeholder?: string;

  /** The number of visible text lines. */
  rows?: number;
}

export function TextArea({
  placeholder,
  rows,
  label,
  description,
  errorMessage,
  ...props
}: TextAreaProps) {
  return (
    <RACTextField {...props}>
      {label && <Label>{label}</Label>}
      <RACTextArea placeholder={placeholder} rows={rows} />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
