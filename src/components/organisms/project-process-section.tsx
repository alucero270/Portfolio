import { ArrowForward } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type ProjectProcessStep = {
  description: string;
  image?: string;
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
          <MonoLabel>S07</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Process</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Design, build, validate</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 640, mx: { xs: "auto", md: 0 }, mt: 1 }}>
          A deliberately practical loop: clarify the risk, build the proof, then test the system
          against the environment it actually has to survive.
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
            <Card
              component="article"
              sx={{
                isolation: "isolate",
                minHeight: { md: 280 },
                overflow: "hidden",
                position: "relative",
                "&:hover .process-photo": {
                  filter: "saturate(0.78) contrast(1.05) brightness(0.62)",
                  transform: "scale(1.03)",
                },
              }}
            >
              {step.image ? (
                <>
                  <Box
                    className="process-photo"
                    alt=""
                    aria-hidden="true"
                    component="img"
                    src={step.image}
                    sx={{
                      filter: "saturate(0.55) contrast(1.05) brightness(0.55)",
                      height: "100%",
                      inset: 0,
                      objectFit: "cover",
                      position: "absolute",
                      transition:
                        "filter 240ms cubic-bezier(.2,.7,.3,1), transform 240ms cubic-bezier(.2,.7,.3,1)",
                      width: "100%",
                      zIndex: -2,
                    }}
                  />
                  <Box
                    aria-hidden
                    sx={{
                      background:
                        "linear-gradient(140deg, rgba(138,124,255,0.42), rgba(138,124,255,0.04) 50%, transparent 75%), linear-gradient(180deg, rgba(26,26,31,0.20), rgba(26,26,31,0.78))",
                      inset: 0,
                      position: "absolute",
                      zIndex: -1,
                    }}
                  />
                </>
              ) : null}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "flex-end",
                  minHeight: { md: 280 },
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <MonoLabel sx={{ color: "primary.light" }}>STEP 0{index + 1}</MonoLabel>
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{ mt: 1.5, textShadow: step.image ? "0 2px 12px rgba(0,0,0,0.6)" : "none" }}
                >
                  {step.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 1, textShadow: step.image ? "0 1px 8px rgba(0,0,0,0.45)" : "none" }}
                >
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
