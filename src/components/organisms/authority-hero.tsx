import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";

type HeroCTA = {
  href: string;
  label: string;
  variant?: "contained" | "outlined" | "text";
};

type AuthorityHeroProps = {
  children: ReactNode;
  ctas?: HeroCTA[];
  eyebrow?: string;
  headingId: string;
  summary?: string;
  techTags?: string[];
  title: string;
};

export function AuthorityHero({
  children,
  ctas = [],
  eyebrow,
  headingId,
  summary,
  techTags = [],
  title,
}: AuthorityHeroProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <Stack spacing={2.5} sx={{ maxWidth: 880 }}>
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        <SectionHeading id={headingId} component="h1" variant="h1">
          {title}
        </SectionHeading>
        {summary ? (
          <Typography component="p" variant="h2" sx={{ color: "text.secondary", maxWidth: 760 }}>
            {summary}
          </Typography>
        ) : null}
        {ctas.length > 0 ? <CTAGroup actions={ctas} /> : null}
        <Box sx={{ maxWidth: 760 }}>{children}</Box>
      </Stack>
      {techTags.length > 0 ? (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 3 }}>
          {techTags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}
