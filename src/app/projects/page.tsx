import type { Metadata } from "next";

import { ProjectGrid } from "@/components/organisms";
import { ProjectIndexTemplate } from "@/components/templates";
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
    <ProjectIndexTemplate title="Projects">
      <ProjectGrid projects={projectItems} />
    </ProjectIndexTemplate>
  );
}
