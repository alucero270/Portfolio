import { ArrowForward } from "@mui/icons-material";
import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

import { CTAGroup, ProjectMetaRow } from "@/components/molecules";

export type ProjectGridItem = {
  actionLabel?: string;
  href: string;
  status?: string;
  summary: string;
  title: string;
  updated?: string;
};

type ProjectGridProps = {
  headingComponent?: "h2" | "h3";
  projects: ProjectGridItem[];
};

export function ProjectGrid({ headingComponent = "h2", projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2.5}>
      {projects.map((project) => (
        <Grid key={project.href} size={{ xs: 12, md: 6 }}>
          <Card component="article">
            <CardContent>
              <Typography
                component={headingComponent}
                variant="h3"
                sx={{ fontSize: headingComponent === "h2" ? "1.45rem" : "1.35rem", mb: 1 }}
              >
                {project.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {project.summary}
              </Typography>
              <ProjectMetaRow status={project.status} updated={project.updated} />
            </CardContent>
            <CardActions>
              <CTAGroup
                actions={[
                  {
                    endIcon: <ArrowForward />,
                    href: project.href,
                    label: project.actionLabel ?? "Open project",
                  },
                ]}
              />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
