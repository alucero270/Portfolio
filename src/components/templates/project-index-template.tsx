import { Stack } from "@mui/material";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/atoms";

type ProjectIndexTemplateProps = {
  children: ReactNode;
  title: string;
};

export function ProjectIndexTemplate({ children, title }: ProjectIndexTemplateProps) {
  return (
    <Stack spacing={3.5}>
      <SectionHeading component="h1" variant="h1">
        {title}
      </SectionHeading>
      {children}
    </Stack>
  );
}
