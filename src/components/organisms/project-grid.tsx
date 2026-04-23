import { Grid } from "@mui/material";

import { ProjectCard, type ProjectCardData } from "@/components/molecules";

export type ProjectGridItem = ProjectCardData;

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
          <ProjectCard {...project} headingComponent={headingComponent} />
        </Grid>
      ))}
    </Grid>
  );
}
