import { ArrowForward } from "@mui/icons-material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";

import { CTAGroup } from "./cta-group";
import { ProjectMetaRow } from "./project-meta-row";

export type ProjectCardData = {
  actionLabel?: string;
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
  headingComponent = "h2",
  href,
  status,
  summary,
  title,
  updated,
}: ProjectCardProps) {
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
        <ProjectMetaRow status={status} updated={updated} />
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
