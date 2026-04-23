import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";

import { SectionHeading } from "@/components/atoms";
import { CTAGroup, ProjectMetaRow } from "@/components/molecules";

type ProjectDetailHeaderProps = {
  backHref: string;
  status?: string;
  title: string;
  updated?: string;
};

export function ProjectDetailHeader({
  backHref,
  status,
  title,
  updated,
}: ProjectDetailHeaderProps) {
  return (
    <Box component="header">
      <Box sx={{ mb: 1.5 }}>
        <CTAGroup
          actions={[
            {
              href: backHref,
              label: "Back to projects",
              startIcon: <ArrowBack />,
            },
          ]}
        />
      </Box>
      <SectionHeading component="h1" variant="h1" gutterBottom>
        {title}
      </SectionHeading>
      <ProjectMetaRow status={status} updated={updated} />
    </Box>
  );
}
