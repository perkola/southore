import {
  Form as RACForm,
  type FormProps as RACFormProps,
} from "react-aria-components";
import "./Form.css";

export type FormProps = RACFormProps;

export function Form(props: FormProps) {
  return <RACForm {...props} />;
}

Form.displayName = "Form";
