import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";

import { SectionHeading, TechTag } from "@/components/atoms";

type AuthorityHeroProps = {
  children: ReactNode;
  headingId: string;
  techTags?: string[];
  title: string;
};

export function AuthorityHero({ children, headingId, techTags = [], title }: AuthorityHeroProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionHeading id={headingId} component="h1" variant="h1" gutterBottom>
        {title}
      </SectionHeading>
      {children}
      {techTags.length > 0 ? (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
          {techTags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}
