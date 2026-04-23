import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { SectionHeading } from "@/components/atoms";

export type BuildPrinciple = {
  description: string;
  title: string;
};

type BuildPhilosophySectionProps = {
  headingId: string;
  principles?: BuildPrinciple[];
  title?: string;
};

export function BuildPhilosophySection({
  headingId,
  principles = [],
  title = "Build Philosophy",
}: BuildPhilosophySectionProps) {
  if (principles.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionHeading id={headingId} sx={{ mb: 2.5 }}>
        {title}
      </SectionHeading>
      <Grid container spacing={2.5}>
        {principles.map((principle) => (
          <Grid key={principle.title} size={{ xs: 12, md: 4 }}>
            <Card component="article">
              <CardContent>
                <Typography component="h3" variant="h3" sx={{ fontSize: "1.25rem", mb: 1 }}>
                  {principle.title}
                </Typography>
                <Typography color="text.secondary">{principle.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
