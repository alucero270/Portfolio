import type { Metadata } from "next";

import { ProjectGrid } from "@/components/organisms";
import { ProjectIndexTemplate } from "@/components/templates";
import { getAllProjects } from "@/lib/content";
import { fetchGitHubFreshnessByProjectSlug } from "@/lib/github";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project index for VTCN, KittyBot, Codex, Pantheon, and OM606 signal integration work.",
};

export default async function ProjectsPage() {
  const [projects, repoFreshnessBySlug] = await Promise.all([
    getAllProjects(),
    fetchGitHubFreshnessByProjectSlug(),
  ]);
  const projectItems = projects.map((project) => ({
    evidenceCount: project.evidence?.length,
    href: toInternalHref(`/projects/${project.slug}`),
    outcome: project.outcome,
    repoLabel:
      project.repoOwner && project.repoName
        ? `${project.repoOwner}/${project.repoName}`
        : undefined,
    repoFreshness: repoFreshnessBySlug.get(project.slug),
    role: project.role,
    status: project.status,
    summary: project.summary,
    tech: project.tech,
    title: project.title,
    updated: project.updated,
  }));

  return (
    <ProjectIndexTemplate
      description="Project pages are treated as proof surfaces: authored context first, with metadata and evidence links where they are available."
      title="Projects"
    >
      <ProjectGrid projects={projectItems} />
    </ProjectIndexTemplate>
  );
}
