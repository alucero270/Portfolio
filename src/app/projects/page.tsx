import { ArrowForward } from "@mui/icons-material";
import { Card, CardActions, CardContent, Grid, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/atoms";
import { CTAGroup, ProjectMetaRow } from "@/components/molecules";
import { getAllProjects } from "@/lib/content";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project index for VTCN, KittyBot, Codex, Pantheon, and OM606 signal integration work.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Stack spacing={3.5}>
      <SectionHeading component="h1" variant="h1">
        Projects
      </SectionHeading>
      <Grid container spacing={2.5}>
        {projects.map((project) => (
          <Grid key={project.slug} size={{ xs: 12, md: 6 }}>
            <Card component="article">
              <CardContent>
                <Typography component="h2" variant="h3" sx={{ fontSize: "1.45rem", mb: 1 }}>
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
                      href: toInternalHref(`/projects/${project.slug}`),
                      label: "Open project",
                    },
                  ]}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
