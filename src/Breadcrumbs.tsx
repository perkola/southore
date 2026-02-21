import type { ReactNode } from "react";
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
  Link as RACLink,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  type BreadcrumbProps as RACBreadcrumbProps,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { ChevronRight } from "./icons";
import "./Breadcrumbs.css";

export interface BreadcrumbsProps<
  T extends object,
> extends RACBreadcrumbsProps<T> {
  /**
   * Accessible label for the navigation landmark.
   * @default "Breadcrumb"
   */
  "aria-label"?: string;
}

export function Breadcrumbs<T extends object>({
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <nav aria-label={ariaLabel} className="breadcrumbs-nav">
      <RACBreadcrumbs {...props} />
    </nav>
  );
}

Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps extends Omit<
  RACBreadcrumbProps,
  "children"
> {
  /**
   * The content of the breadcrumb item.
   */
  children: ReactNode;

  /**
   * The URL to navigate to. If provided, renders a Link.
   * For custom routing, pass your router's Link component as children instead.
   */
  href?: string;

  /**
   * Props to pass to the internal Link when using href.
   */
  linkProps?: Omit<RACLinkProps, "href" | "children">;
}

export function BreadcrumbItem({
  children,
  href,
  linkProps,
  ...props
}: BreadcrumbItemProps) {
  return (
    <RACBreadcrumb {...props}>
      {({ isCurrent }) => (
        <>
          {isCurrent ? (
            <span>{children}</span>
          ) : href ? (
            <RACLink href={href} {...linkProps}>
              {children}
            </RACLink>
          ) : (
            children
          )}
          {!isCurrent && (
            <ChevronRight
              size={14}
              className="breadcrumb-separator"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </RACBreadcrumb>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";
