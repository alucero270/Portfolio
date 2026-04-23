import { Box, Typography } from "@mui/material";

import { SectionEyebrow, SectionHeading } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";

type AboutPreviewSectionProps = {
  aboutHref: string;
  headingId: string;
  summary: string;
};

export function AboutPreviewSection({ aboutHref, headingId, summary }: AboutPreviewSectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionEyebrow>About</SectionEyebrow>
      <SectionHeading id={headingId} sx={{ mb: 1.5 }}>
        Founder-led technical work
      </SectionHeading>
      <Typography color="text.secondary" sx={{ maxWidth: 760, mb: 2.5 }}>
        {summary}
      </Typography>
      <CTAGroup actions={[{ href: aboutHref, label: "Read about Alex", variant: "outlined" }]} />
    </Box>
  );
}
