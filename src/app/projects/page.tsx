import { Stack } from "@mui/material";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/atoms";
import { ProjectGrid } from "@/components/organisms";
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
  const projectItems = projects.map((project) => ({
    href: toInternalHref(`/projects/${project.slug}`),
    status: project.status,
    summary: project.summary,
    title: project.title,
    updated: project.updated,
  }));

  return (
    <Stack spacing={3.5}>
      <SectionHeading component="h1" variant="h1">
        Projects
      </SectionHeading>
      <ProjectGrid projects={projectItems} />
    </Stack>
  );
}
