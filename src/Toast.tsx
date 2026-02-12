import {
  Text,
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegion,
} from "react-aria-components";
import { Button } from "./Button";
import { X } from "./icons";
import { toastQueue } from "./toastQueue";
import "./Toast.css";

export interface GlobalToastRegionProps {
  /** Custom aria-label for the toast region. */
  "aria-label"?: string;
}

/**
 * Renders the global toast region. Place this at the root of your app.
 */
export function GlobalToastRegion({
  "aria-label": ariaLabel = "Notifications",
}: GlobalToastRegionProps) {
  return (
    <ToastRegion queue={toastQueue} aria-label={ariaLabel} className="toast-region">
      {({ toast }) => (
        <RACToast toast={toast} className="toast">
          <ToastContent>
            <Text slot="title">{toast.content.message}</Text>
          </ToastContent>
          <Button slot="close" variant="text" size="small" aria-label="Dismiss notification">
            <X size={16} aria-hidden="true" />
          </Button>
        </RACToast>
      )}
    </ToastRegion>
  );
}

GlobalToastRegion.displayName = "GlobalToastRegion";
