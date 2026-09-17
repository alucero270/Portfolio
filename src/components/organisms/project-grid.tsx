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
      {projects.map((project, index) => {
        const isOddLast = projects.length % 2 === 1 && index === projects.length - 1;

        return (
          <Grid key={project.href} size={{ xs: 12, md: isOddLast ? 12 : 6 }}>
            <ProjectCard {...project} headingComponent={headingComponent} />
          </Grid>
        );
      })}
    </Grid>
  );
}
