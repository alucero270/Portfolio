import { ArrowForward } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

import { SectionHeading } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";
import { ProjectGrid, type ProjectGridItem } from "@/components/organisms/project-grid";

type SelectedWorkSectionProps = {
  allProjectsHref: string;
  headingId: string;
  projects: ProjectGridItem[];
  title?: string;
};

export function SelectedWorkSection({
  allProjectsHref,
  headingId,
  projects,
  title = "Featured Projects",
}: SelectedWorkSectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
        <SectionHeading id={headingId}>{title}</SectionHeading>
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
