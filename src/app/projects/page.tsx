import { ArrowForward } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";

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
      <Typography component="h1" variant="h1">
        Projects
      </Typography>
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
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {project.status ? (
                    <Chip size="small" label={project.status} color="primary" />
                  ) : null}
                  {project.updated ? (
                    <Chip size="small" label={`Updated ${project.updated}`} />
                  ) : null}
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  href={toInternalHref(`/projects/${project.slug}`)}
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  Open project
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
