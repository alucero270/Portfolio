import { Box } from "@mui/material";

import { SectionHeading } from "@/components/atoms";
import { EvidenceLinkList, type EvidenceLink } from "@/components/molecules";

type EngineeringEvidenceSectionProps = {
  headingId: string;
  links?: EvidenceLink[];
  title?: string;
};

export function EngineeringEvidenceSection({
  headingId,
  links = [],
  title = "Engineering Evidence",
}: EngineeringEvidenceSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId}>
      <SectionHeading id={headingId} sx={{ mb: 2 }}>
        {title}
      </SectionHeading>
      <EvidenceLinkList links={links} />
    </Box>
  );
}
