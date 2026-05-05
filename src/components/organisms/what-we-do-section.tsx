import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type WhatWeDoItem = {
  description: string;
  title: string;
};

type WhatWeDoSectionProps = {
  headingId: string;
  items: WhatWeDoItem[];
  title?: string;
};

export function WhatWeDoSection({
  headingId,
  items,
  title = "What I Do Through Loose Arrow Labs",
}: WhatWeDoSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>§06</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Services</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>{title}</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 640, mt: 1 }}>
          Three practical lanes. No agency menu, just the kinds of systems this site can credibly
          show.
        </Typography>
      </Box>
      <Grid container spacing={2.5}>
        {items.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card component="article">
              <CardContent>
                <MonoLabel sx={{ color: "primary.main" }}>0{index + 1}</MonoLabel>
                <Typography component="h3" variant="h3" sx={{ fontSize: "1.25rem", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
