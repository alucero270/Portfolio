import { ArrowForward } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";

type ContactCTASectionProps = {
  contactHref: string;
  headingId: string;
  summary: string;
};

export function ContactCTASection({ contactHref, headingId, summary }: ContactCTASectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>S11</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Engagement</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Start with the system</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
          {summary}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionEyebrow>Describe the constraint</SectionEyebrow>
            <Typography component="h3" variant="h3" sx={{ mt: 1 }}>
              What needs to be built or integrated?
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.25, mb: 2.5 }}>
              Share the system boundary, available hardware, integration points, and what successful
              validation would look like.
            </Typography>
            <CTAGroup
              actions={[
                {
                  endIcon: <ArrowForward />,
                  href: contactHref,
                  label: "Contact Loose Arrow Labs",
                  variant: "contained",
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionEyebrow>Good fit when</SectionEyebrow>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {[
                "The work spans hardware, firmware, and software domains.",
                "You need systems integration across mechanical and electrical boundaries.",
                "An honest technical assessment and validation plan matter more than speed.",
              ].map((item, index) => (
                <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: "baseline" }}>
                  <MonoLabel>0{index + 1}</MonoLabel>
                  <Typography color="text.secondary">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
