import { Box, Typography } from "@mui/material";

import { SectionHeading } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";

type ContactCTASectionProps = {
  contactHref: string;
  headingId: string;
  summary: string;
};

export function ContactCTASection({ contactHref, headingId, summary }: ContactCTASectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionHeading id={headingId} sx={{ mb: 1.5 }}>
        Start with the constraint
      </SectionHeading>
      <Typography color="text.secondary" sx={{ maxWidth: 720, mb: 2.5 }}>
        {summary}
      </Typography>
      <CTAGroup actions={[{ href: contactHref, label: "Contact Alex", variant: "contained" }]} />
    </Box>
  );
}
