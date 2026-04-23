import { Stack } from "@mui/material";
import type { ReactNode } from "react";

type ProjectDetailTemplateProps = {
  children: ReactNode;
  header: ReactNode;
};

export function ProjectDetailTemplate({ children, header }: ProjectDetailTemplateProps) {
  return (
    <Stack spacing={3.5}>
      {header}
      {children}
    </Stack>
  );
}
