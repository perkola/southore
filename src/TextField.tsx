import { useRef, type ReactNode } from "react";
import {
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
  Input,
  Group,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import type { FieldProps } from "./Field";
import "./Field.css";
import "./TextField.css";

export interface TextFieldProps extends RACTextFieldProps, FieldProps {
  /** Placeholder text shown when the input is empty. */
  placeholder?: string;

  /** Content rendered before the input (e.g. an icon or text). */
  startAdornment?: ReactNode;

  /** Content rendered after the input (e.g. an icon or text). */
  endAdornment?: ReactNode;
}

export function TextField({
  placeholder,
  startAdornment,
  endAdornment,
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <RACTextField {...props}>
      {label && <Label>{label}</Label>}
      <Group
        className="text-field"
        onPointerDown={(e) => {
          if (e.target instanceof HTMLInputElement) return;
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {startAdornment && (
          <span className="text-field-adornment">{startAdornment}</span>
        )}
        <Input ref={inputRef} placeholder={placeholder} />
        {endAdornment && (
          <span className="text-field-adornment">{endAdornment}</span>
        )}
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
}
