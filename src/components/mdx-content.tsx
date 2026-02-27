import { Box } from "@mui/material";
import type { ReactNode } from "react";

type MdxContentProps = {
  children: ReactNode;
};

export function MdxContent({ children }: MdxContentProps) {
  return <Box className="mdx-content">{children}</Box>;
}
