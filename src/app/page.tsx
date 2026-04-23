import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";

import { SectionEyebrow, SectionHeading, StatusChip, TechTag } from "@/components/atoms";
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
        <SectionHeading id="home-bio-heading" component="h1" variant="h1" gutterBottom>
          {bio.frontmatter.title ?? "Alex Lucero"}
        </SectionHeading>
        <MdxContent>{bio.content}</MdxContent>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
          {["Next.js", "TypeScript", "MUI", "MDX"].map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </Stack>
      </Box>

      <Divider />

      <Box component="section" aria-labelledby="featured-projects-heading">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <SectionHeading id="featured-projects-heading">Featured Projects</SectionHeading>
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
                  {project.status ? <StatusChip label={project.status} /> : null}
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
        <SectionEyebrow>Now</SectionEyebrow>
        <SectionHeading id="working-now-heading" sx={{ mb: 1.5 }}>
          What I&apos;m Working On
        </SectionHeading>
        <Typography component="p" color="text.secondary">
          {bio.frontmatter.now ??
            "TODO: Add current work focus in /content/bio.mdx frontmatter `now`."}
        </Typography>
      </Box>
    </Stack>
  );
}
