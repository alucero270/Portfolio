import { ArrowForward } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type ProjectProcessStep = {
  description: string;
  title: string;
};

type ProjectProcessSectionProps = {
  headingId: string;
  steps: ProjectProcessStep[];
};

export function ProjectProcessSection({ headingId, steps }: ProjectProcessSectionProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>§07</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Process</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>How a project runs</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 640, mt: 1 }}>
          Three phases. Deliberately predictable: clarify the boundary, build in public enough to
          inspect, then validate the system where it will actually run.
        </Typography>
      </Box>

      <Box
        sx={{
          alignItems: "stretch",
          display: "grid",
          gap: { xs: 1.25, md: 0 },
          gridTemplateColumns: { xs: "1fr", md: "1fr 36px 1fr 36px 1fr" },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.title}
            sx={{ display: "contents", "&:last-of-type .process-arrow": { display: "none" } }}
          >
            <Card component="article">
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <MonoLabel>0{index + 1}</MonoLabel>
                <Typography component="h3" variant="h3" sx={{ mt: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
            {index < steps.length - 1 ? (
              <Box
                className="process-arrow"
                aria-hidden
                sx={{
                  alignItems: "center",
                  color: "text.secondary",
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                }}
              >
                <ArrowForward fontSize="small" />
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
