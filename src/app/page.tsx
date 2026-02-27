import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import { getBio, getFeaturedProjects } from "@/lib/content";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description: "Alex Lucero portfolio home with bio, featured projects, and current work focus.",
};

export default async function HomePage() {
  const [bio, featuredProjects] = await Promise.all([getBio(), getFeaturedProjects()]);

  return (
    <Stack spacing={7}>
      <Box component="section" aria-labelledby="home-bio-heading">
        <Typography id="home-bio-heading" component="h1" variant="h1" gutterBottom>
          {bio.frontmatter.title ?? "Alex Lucero"}
        </Typography>
        <MdxContent>{bio.content}</MdxContent>
      </Box>

      <Divider />

      <Box component="section" aria-labelledby="featured-projects-heading">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography id="featured-projects-heading" component="h2" variant="h2">
            Featured Projects
          </Typography>
          <Button href={toInternalHref("/projects")} variant="text" endIcon={<ArrowForward />}>
            All projects
          </Button>
        </Stack>
        <Grid container spacing={2.5}>
          {featuredProjects.map((project) => (
            <Grid key={project.slug} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card component="article">
                <CardContent>
                  <Typography component="h3" variant="h3" sx={{ fontSize: "1.35rem", mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {project.summary}
                  </Typography>
                  {project.status ? <Chip size="small" label={project.status} /> : null}
                </CardContent>
                <CardActions>
                  <Button
                    href={toInternalHref(`/projects/${project.slug}`)}
                    size="small"
                    endIcon={<ArrowForward />}
                  >
                    View details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      <Box component="section" aria-labelledby="working-now-heading">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <Chip size="small" label="Now" color="primary" />
          <Typography id="working-now-heading" component="h2" variant="h2">
            What I&apos;m Working On
          </Typography>
        </Stack>
        <Typography component="p" color="text.secondary">
          {bio.frontmatter.now ??
            "TODO: Add current work focus in /content/bio.mdx frontmatter `now`."}
        </Typography>
      </Box>
    </Stack>
  );
}
