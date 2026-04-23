import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import {
  AuthorityHero,
  SelectedWorkSection,
  WhatWeDoSection,
  type WhatWeDoItem,
  WorkingNowCard,
} from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import { getBio, getFeaturedProjects } from "@/lib/content";
import { toInternalHref } from "@/lib/routing";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description: "Alex Lucero portfolio home with bio, featured projects, and current work focus.",
};

const whatWeDoItems: WhatWeDoItem[] = [
  {
    title: "Systems structuring",
    description:
      "Turn ambiguous technical work into explicit boundaries, data shapes, implementation paths, and validation steps.",
  },
  {
    title: "AI integration",
    description:
      "Use LLMs where they improve retrieval, automation, and operator flow without making live AI the source of truth.",
  },
  {
    title: "Supportable prototypes",
    description:
      "Build small, inspectable slices with enough documentation, tests, and tradeoff notes to keep moving after the demo.",
  },
];

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
          ctas={[
            {
              href: "#featured-projects-heading",
              label: "Selected work",
              variant: "contained",
            },
            {
              href: toInternalHref("/contact"),
              label: "Contact",
              variant: "outlined",
            },
          ]}
          eyebrow={`${siteConfig.ownerName} / ${siteConfig.studioName}`}
          headingId="home-bio-heading"
          summary="I build practical software, automation, and systems-integration projects with an emphasis on reliability, documentation, and proof you can inspect."
          techTags={["Next.js", "TypeScript", "MUI", "MDX"]}
          title={bio.frontmatter.title ?? "Alex Lucero"}
        >
          <MdxContent>{bio.content}</MdxContent>
        </AuthorityHero>,
        <WhatWeDoSection key="what-we-do" headingId="what-we-do-heading" items={whatWeDoItems} />,
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
