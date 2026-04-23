import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/atoms";

type ContentPageTemplateProps = {
  actions?: ReactNode;
  children: ReactNode;
  title: string;
};

export function ContentPageTemplate({ actions, children, title }: ContentPageTemplateProps) {
  return (
    <Stack spacing={3.5}>
      <Box component="header">
        <SectionHeading component="h1" variant="h1" gutterBottom={Boolean(actions)}>
          {title}
        </SectionHeading>
        {actions}
      </Box>
      {children}
    </Stack>
  );
}
