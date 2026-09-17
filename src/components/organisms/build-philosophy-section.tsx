import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

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
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 3,
          pb: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mb: 1.5 }}
        >
          <MonoLabel>S08</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Operating Method</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>{title}</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 640, mx: { xs: "auto", md: 0 }, mt: 1 }}>
          The studio bias is toward clear boundaries, observable behavior, and validation before
          scale.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, md: 6 },
          gridTemplateColumns: { xs: "1fr", md: "1.25fr 0.85fr" },
        }}
      >
        <Box>
          <SectionEyebrow>Working principles</SectionEyebrow>
          <Stack sx={{ mt: 1 }}>
            {principles.map((principle, index) => (
              <Box
                key={principle.title}
                sx={{
                  borderBottom: index < principles.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "40px 1fr",
                  py: 2.25,
                }}
              >
                <MonoLabel sx={{ color: "primary.main", pt: 0.5 }}>0{index + 1}</MonoLabel>
                <Box>
                  <Typography component="h3" sx={{ fontSize: "1.05rem", fontWeight: 700 }}>
                    {principle.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ mt: 0.75 }}>
                    {principle.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <SectionEyebrow>Non-negotiables</SectionEyebrow>
            <Stack spacing={1.75} sx={{ mt: 2 }}>
              {[
                "Structure before build",
                "Interfaces made explicit",
                "Incremental validation",
                "Documentation as output",
                "Run what you build",
              ].map((principle, index) => (
                <Stack
                  key={principle}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "baseline" }}
                >
                  <MonoLabel>0{index + 1}</MonoLabel>
                  <Typography sx={{ fontWeight: 600 }}>{principle}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
