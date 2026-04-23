import { Link } from "@mui/material";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  children?: ReactNode;
  href: string;
};

export function ExternalLink({ children, href }: ExternalLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ wordBreak: "break-word" }}>
      {children ?? href}
    </Link>
  );
}
