import { Box, Typography } from "@mui/material";

import { SectionEyebrow, SectionHeading } from "@/components/atoms";

type WorkingNowCardProps = {
  headingId: string;
  summary: string;
};

export function WorkingNowCard({ headingId, summary }: WorkingNowCardProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionEyebrow>Now</SectionEyebrow>
      <SectionHeading id={headingId} sx={{ mb: 1.5 }}>
        What I&apos;m Working On
      </SectionHeading>
      <Typography component="p" color="text.secondary">
        {summary}
      </Typography>
    </Box>
  );
}
