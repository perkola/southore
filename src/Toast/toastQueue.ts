import type { ReactNode } from "react";
import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components";

export interface ToastContent {
  /** The message to display in the toast. */
  message: ReactNode;
}

export interface ToastOptions {
  /**
   * Duration in milliseconds before the toast auto-dismisses.
   * Set to `null` for toasts that require manual dismissal.
   * A minimum duration of 5000ms is recommended for accessibility.
   *
   * @default 8000
   */
  timeout?: number | null;

  /**
   * Handler called when the toast is closed.
   */
  onClose?: () => void;
}

/** Global toast queue - can be used to add toasts from anywhere in the app. */
export const toastQueue = new ToastQueue<ToastContent>({
  maxVisibleToasts: 5,
});

/**
 * Add a toast notification.
 *
 * @param message - The message to display
 * @param options - Optional configuration (timeout, onClose)
 * @returns The toast key for programmatic dismissal
 */
export function addToast(message: ReactNode, options?: ToastOptions): string {
  return toastQueue.add(
    { message },
    {
      timeout:
        options?.timeout === null ? undefined : (options?.timeout ?? 8000),
      onClose: options?.onClose,
    },
  );
}

/**
 * Remove a toast by its key.
 */
export function removeToast(key: string): void {
  toastQueue.close(key);
}
