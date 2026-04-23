import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import {
  AboutPreviewSection,
  AuthorityHero,
  BuildPhilosophySection,
  type BuildPrinciple,
  ContactCTASection,
  EngineeringEvidenceSection,
  SelectedWorkSection,
  WhatWeDoSection,
  type WhatWeDoItem,
  WorkingNowCard,
} from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import type { ActivityItemData, EvidenceLink } from "@/components/molecules";
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

const buildPrinciples: BuildPrinciple[] = [
  {
    title: "Define the boundary",
    description:
      "Name the interfaces, ownership, failure modes, and data shapes before the implementation gets too clever.",
  },
  {
    title: "Validate the risky part",
    description:
      "Prototype around the unknowns first, then keep the validation steps close enough that future changes can be checked.",
  },
  {
    title: "Leave a trail",
    description:
      "Prefer docs, decisions, run notes, and small tests over invisible heroics. The next pass should be easier to reason about.",
  },
];

const workingNowFallbackItems: ActivityItemData[] = [
  {
    label: "Current focus",
    summary:
      "Personal retrieval and documentation workflows for project decisions, procedures, and engineering notes.",
    title: "Codex",
  },
  {
    label: "Systems integration",
    summary:
      "Companion robot planning, service boundaries, and hardware/software interface contracts.",
    title: "KittyBot",
  },
  {
    label: "Embedded Linux",
    summary:
      "Telemetry platform work around sensor input, framing, persistence, and validation loops.",
    title: "VTCN",
  },
];

export default async function HomePage() {
  const [bio, featuredProjects] = await Promise.all([getBio(), getFeaturedProjects()]);
  const featuredProjectItems = featuredProjects.map((project) => ({
    actionLabel: "View details",
    evidenceCount: project.evidence?.length,
    href: toInternalHref(`/projects/${project.slug}`),
    status: project.status,
    summary: project.summary,
    title: project.title,
  }));
  const evidenceLinks: EvidenceLink[] = [
    {
      description: "Authored project pages with summaries, status, and implementation context.",
      href: toInternalHref("/projects"),
      label: "Project evidence index",
    },
    {
      description: "Embedded Linux and telemetry work where interfaces and validation matter.",
      href: toInternalHref("/projects/vtcn"),
      label: "Embedded systems proof surface",
    },
    {
      description:
        "Homelab infrastructure work for repeatable operations and supportable services.",
      href: toInternalHref("/projects/pantheon"),
      label: "Infrastructure proof surface",
    },
  ];

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
        <BuildPhilosophySection
          key="build-philosophy"
          headingId="build-philosophy-heading"
          principles={buildPrinciples}
          title="How I Work"
        />,
        <EngineeringEvidenceSection
          key="engineering-evidence"
          headingId="engineering-evidence-heading"
          links={evidenceLinks}
          title="Proof of Work"
        />,
        <WorkingNowCard
          key="working-now"
          headingId="working-now-heading"
          items={workingNowFallbackItems}
          summary={
            bio.frontmatter.now ??
            "TODO: Add current work focus in /content/bio.mdx frontmatter `now`."
          }
        />,
        <AboutPreviewSection
          key="about-preview"
          aboutHref={toInternalHref("/about")}
          headingId="about-preview-heading"
          summary="The site is centered on Alex Lucero: a software engineer using Loose Arrow Labs as the studio identity for hands-on technical work, systems experiments, and selected builds."
        />,
        <ContactCTASection
          key="contact-cta"
          contactHref={toInternalHref("/contact")}
          headingId="contact-cta-heading"
          summary="Send the project, system, or workflow constraint. The useful first step is usually clarifying boundaries, risks, and what would count as proof."
        />,
      ]}
    />
  );
}
