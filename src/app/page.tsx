import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import { AuthorityHero, SelectedWorkSection, WorkingNowCard } from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import { getBio, getFeaturedProjects } from "@/lib/content";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description: "Alex Lucero portfolio home with bio, featured projects, and current work focus.",
};

export default async function HomePage() {
  const [bio, featuredProjects] = await Promise.all([getBio(), getFeaturedProjects()]);
  const featuredProjectItems = featuredProjects.map((project) => ({
    actionLabel: "View details",
    href: toInternalHref(`/projects/${project.slug}`),
    status: project.status,
    summary: project.summary,
    title: project.title,
  }));

  return (
    <HomeTemplate
      sections={[
        <AuthorityHero
          key="hero"
          headingId="home-bio-heading"
          techTags={["Next.js", "TypeScript", "MUI", "MDX"]}
          title={bio.frontmatter.title ?? "Alex Lucero"}
        >
          <MdxContent>{bio.content}</MdxContent>
        </AuthorityHero>,
        <SelectedWorkSection
          key="selected-work"
          allProjectsHref={toInternalHref("/projects")}
          headingId="featured-projects-heading"
          projects={featuredProjectItems}
        />,
        <WorkingNowCard
          key="working-now"
          headingId="working-now-heading"
          summary={
            bio.frontmatter.now ??
            "TODO: Add current work focus in /content/bio.mdx frontmatter `now`."
          }
        />,
      ]}
    />
  );
}
