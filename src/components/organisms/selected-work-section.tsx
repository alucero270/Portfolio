import { ArrowForward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";
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
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        spacing={2}
        sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}
      >
        <Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>§05</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
            <SectionEyebrow sx={{ mb: 0 }}>Client view</SectionEyebrow>
          </Stack>
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
