import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { SectionHeading } from "@/components/atoms";

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
    <Box component="section" aria-labelledby={headingId}>
      <SectionHeading id={headingId} sx={{ mb: 2.5 }}>
        {title}
      </SectionHeading>
      <Grid container spacing={2.5}>
        {items.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card component="article">
              <CardContent>
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
