import type { ComponentProps, ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as RACModal,
  ModalOverlay,
} from "react-aria-components";
import { Button, type ButtonProps } from "../Button/Button";
import "./Modal.css";

export interface ModalTriggerProps {
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

function Trigger(props: ModalTriggerProps) {
  return <DialogTrigger {...props} />;
}

export interface ModalProps {
  /**
   * Modal content. Should include a `<Modal.Title>` to provide an accessible
   * name for the dialog. If no visible title is needed, use `aria-label` instead.
   */
  children?: ReactNode | ((opts: { close: () => void }) => ReactNode);
  isDismissable?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
  role?: "dialog" | "alertdialog";
  /**
   * Accessible name for the dialog when no `<Modal.Title>` is rendered.
   * Either `Modal.Title` or `aria-label` is required for accessibility.
   */
  "aria-label"?: string;
}

function ModalRoot({
  children,
  isDismissable = true,
  isOpen,
  onOpenChange,
  className,
  role,
  "aria-label": ariaLabel,
}: ModalProps) {
  return (
    <ModalOverlay
      className="modal-overlay"
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <RACModal className="modal">
        <Dialog
          className={["modal-dialog", className].filter(Boolean).join(" ")}
          role={role}
          aria-label={ariaLabel}
        >
          {children}
        </Dialog>
      </RACModal>
    </ModalOverlay>
  );
}

export interface ModalTitleProps extends ComponentProps<"h2"> {
  /**
   * Heading level. Use `3` or `4` when the modal appears in a context where
   * `<h2>` would break the page's heading hierarchy.
   *
   * @default 2
   */
  level?: 2 | 3 | 4;
}

function Title({ level = 2, ...props }: ModalTitleProps) {
  return <Heading {...props} slot="title" className="modal-title" level={level} />;
}

export type ModalFooterProps = ComponentProps<"footer">;

function Footer({ className, ...props }: ModalFooterProps) {
  return <footer {...props} className={["modal-footer", className].filter(Boolean).join(" ")} />;
}

/**
 * Props for `Modal.CloseButton`. Prefer `size="medium"` (default) in modal
 * footers — `size="small"` produces a 24px target, the WCAG 2.5.8 AA minimum.
 */
export type ModalCloseButtonProps = ButtonProps;

function CloseButton(props: ModalCloseButtonProps) {
  return <Button {...props} slot="close" />;
}

ModalRoot.displayName = "Modal";
Trigger.displayName = "Modal.Trigger";
Title.displayName = "Modal.Title";
Footer.displayName = "Modal.Footer";
CloseButton.displayName = "Modal.CloseButton";

export const Modal = Object.assign(ModalRoot, {
  Trigger,
  Title,
  Footer,
  CloseButton,
});
