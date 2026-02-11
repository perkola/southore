import { useRef, type ReactNode } from "react";
import {
  NumberField as RACNumberField,
  type NumberFieldProps as RACNumberFieldProps,
  type ValidationResult,
  Input,
  Group,
  Label,
  Text,
  FieldError,
  Button,
} from "react-aria-components";
import { Minus, Plus } from "lucide-react";
import "./NumberField.css";

export interface NumberFieldProps extends RACNumberFieldProps {
  /** Content rendered before the input (e.g. an icon or currency symbol). */
  startAdornment?: ReactNode;

  /** Content rendered after the input (e.g. a unit label). */
  endAdornment?: ReactNode;

  /** A visible label for the input. */
  label?: string;

  /** A brief description shown below the input. */
  description?: string;

  /** An error message shown when the field is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);

  /** Hide the increment/decrement stepper buttons. */
  hideStepper?: boolean;
}

export function NumberField({
  startAdornment,
  endAdornment,
  label,
  description,
  errorMessage,
  hideStepper = false,
  ...props
}: NumberFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <RACNumberField {...props}>
      {label && <Label>{label}</Label>}
      <Group
        className="number-field"
        data-has-stepper={!hideStepper || undefined}
        onPointerDown={(e) => {
          if (
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLButtonElement ||
            (e.target as HTMLElement).closest("button")
          )
            return;
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {!hideStepper && (
          <Button slot="decrement" className="number-field-stepper-button">
            <Minus size={16} aria-hidden />
          </Button>
        )}
        {startAdornment && (
          <span className="number-field-adornment">{startAdornment}</span>
        )}
        <Input ref={inputRef} />
        {endAdornment && (
          <span className="number-field-adornment">{endAdornment}</span>
        )}
        {!hideStepper && (
          <Button slot="increment" className="number-field-stepper-button">
            <Plus size={16} aria-hidden />
          </Button>
        )}
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}
