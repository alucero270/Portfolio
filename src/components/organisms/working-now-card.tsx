import { Box, Stack, Typography } from "@mui/material";

import { SectionEyebrow, SectionHeading } from "@/components/atoms";
import { ActivityItem, type ActivityItemData } from "@/components/molecules";

type WorkingNowCardProps = {
  headingId: string;
  items?: ActivityItemData[];
  summary: string;
};

export function WorkingNowCard({ headingId, items = [], summary }: WorkingNowCardProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionEyebrow>Now</SectionEyebrow>
      <SectionHeading id={headingId} sx={{ mb: 1.5 }}>
        What I&apos;m Working On
      </SectionHeading>
      <Typography component="p" color="text.secondary">
        {summary}
      </Typography>
      {items.length > 0 ? (
        <Stack spacing={2} sx={{ mt: 2.5 }}>
          {items.map((item) => (
            <ActivityItem key={item.title} {...item} />
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}
