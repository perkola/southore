import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import "./Link.css";

export type LinkProps = RACLinkProps;

export function Link(props: LinkProps) {
  return <RACLink {...props} />;
}

Link.displayName = "Link";
