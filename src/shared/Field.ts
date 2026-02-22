import type { ValidationResult } from "react-aria-components";

export interface FieldProps {
  /** A visible label for the field. */
  label?: string;

  /** A brief description shown below the field. */
  description?: string;

  /** An error message shown when the field is invalid. */
  errorMessage?: string | ((validation: ValidationResult) => string);
}
