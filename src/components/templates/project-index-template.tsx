import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/atoms";

type ProjectIndexTemplateProps = {
  children: ReactNode;
  description?: string;
  title: string;
};

export function ProjectIndexTemplate({ children, description, title }: ProjectIndexTemplateProps) {
  return (
    <Stack spacing={3.5}>
      <Stack spacing={1.5}>
        <SectionHeading component="h1" variant="h1">
          {title}
        </SectionHeading>
        {description ? (
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            {description}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}
