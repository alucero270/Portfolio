import { ArrowForward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { SectionHeading } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";
import { ProjectGrid, type ProjectGridItem } from "@/components/organisms/project-grid";

type SelectedWorkSectionProps = {
  allProjectsHref: string;
  description?: string;
  headingId: string;
  projects: ProjectGridItem[];
  title?: string;
};

export function SelectedWorkSection({
  allProjectsHref,
  description = "Representative projects where the architecture, constraints, and implementation details are part of the evidence.",
  headingId,
  projects,
  title = "Selected Work",
}: SelectedWorkSectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <Box>
          <SectionHeading id={headingId}>{title}</SectionHeading>
          <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
            {description}
          </Typography>
        </Box>
        <CTAGroup
          actions={[
            {
              endIcon: <ArrowForward />,
              href: allProjectsHref,
              label: "All projects",
            },
          ]}
        />
      </Stack>
      <ProjectGrid headingComponent="h3" projects={projects} />
    </Box>
  );
}
