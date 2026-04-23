import { ArrowForward } from "@mui/icons-material";
import { Card, CardActions, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel } from "@/components/atoms";

import { CTAGroup } from "./cta-group";
import { ProjectMetaRow } from "./project-meta-row";

export type ProjectCardData = {
  actionLabel?: string;
  evidenceCount?: number;
  href: string;
  status?: string;
  summary: string;
  title: string;
  updated?: string;
};

type ProjectCardProps = ProjectCardData & {
  headingComponent?: "h2" | "h3";
};

export function ProjectCard({
  actionLabel = "Open project",
  evidenceCount,
  headingComponent = "h2",
  href,
  status,
  summary,
  title,
  updated,
}: ProjectCardProps) {
  const evidenceLabel =
    evidenceCount && evidenceCount > 1 ? `${evidenceCount} evidence links` : "1 evidence link";

  return (
    <Card component="article">
      <CardContent>
        <Typography
          component={headingComponent}
          variant="h3"
          sx={{ fontSize: headingComponent === "h2" ? "1.45rem" : "1.35rem", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {summary}
        </Typography>
        <Stack spacing={1}>
          <ProjectMetaRow status={status} updated={updated} />
          {evidenceCount ? <MonoLabel>{evidenceLabel}</MonoLabel> : null}
        </Stack>
      </CardContent>
      <CardActions>
        <CTAGroup
          actions={[
            {
              endIcon: <ArrowForward />,
              href,
              label: actionLabel,
            },
          ]}
        />
      </CardActions>
    </Card>
  );
}
