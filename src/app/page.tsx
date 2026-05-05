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
  SignalStripSection,
  type SignalStripItem,
  WhatWeDoSection,
  type WhatWeDoItem,
  WorkingNowCard,
} from "@/components/organisms";
import { HomeTemplate } from "@/components/templates";
import type { ActivityItemData, EvidenceLink } from "@/components/molecules";
import { getBio, getFeaturedProjects } from "@/lib/content";
import {
  fetchAllowlistedGitHubRepos,
  getFilteredGitHubActivity,
  type GitHubActivityItem,
} from "@/lib/github";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Home",
  description: "Alex Lucero portfolio home with bio, featured projects, and current work focus.",
};

const whatWeDoItems: WhatWeDoItem[] = [
  {
    title: "Embedded + systems integration",
    description:
      "Connect software to physical systems through explicit interfaces, telemetry, and validation steps.",
  },
  {
    title: "Robotics + prototype builds",
    description:
      "Build and stabilize systems that move, respond, and expose behavior clearly enough to test.",
  },
  {
    title: "Software + AI-assisted tools",
    description:
      "Use practical software and selective AI assistance for diagnostics, workflows, and system understanding.",
  },
];

const signalStripItems: SignalStripItem[] = [
  {
    label: "Embedded + integration",
    description: "Sensors, controllers, and software under real constraints.",
  },
  {
    label: "Robotics + automation",
    description: "Control logic, state behavior, and physical iteration.",
  },
  {
    label: "Software tooling",
    description: "Diagnostics, data flow, and maintainable internal utilities.",
  },
  {
    label: "Inspectable proof",
    description: "Repos, notes, diagrams, validation logs, and written tradeoffs.",
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
    label: "Curated focus",
    summary:
      "Personal retrieval and documentation workflows for project decisions, procedures, and engineering notes.",
    title: "Codex",
  },
  {
    label: "Curated system",
    summary:
      "Companion robot planning, service boundaries, and hardware/software interface contracts.",
    title: "KittyBot",
  },
  {
    label: "Curated system",
    summary:
      "Telemetry platform work around sensor input, framing, persistence, and validation loops.",
    title: "VTCN",
  },
];

function toWorkingNowActivityItem(activityItem: GitHubActivityItem): ActivityItemData {
  return {
    href: activityItem.url,
    label: `Live signal / ${activityItem.label}`,
    summary: activityItem.summary,
    title: activityItem.title,
  };
}

async function getWorkingNowItems(): Promise<ActivityItemData[]> {
  if (process.env.STATIC_EXPORT === "true") {
    return workingNowFallbackItems;
  }

  try {
    const repos = await fetchAllowlistedGitHubRepos(undefined, { commitLimit: 8 });
    const activityItems = getFilteredGitHubActivity(repos, { limit: 3 }).map(
      toWorkingNowActivityItem,
    );

    return activityItems.length > 0 ? activityItems : workingNowFallbackItems;
  } catch {
    return workingNowFallbackItems;
  }
}

export default async function HomePage() {
  const [bio, featuredProjects, workingNowItems] = await Promise.all([
    getBio(),
    getFeaturedProjects(),
    getWorkingNowItems(),
  ]);
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
              label: "View current work",
              variant: "contained",
            },
            {
              href: toInternalHref("/contact"),
              label: "Start a conversation",
              variant: "outlined",
            },
          ]}
          eyebrow="Active systems / prototype builds / engineering in progress"
          headingId="home-bio-heading"
          summary="Loose Arrow Labs is the studio identity for hands-on engineering across software, embedded systems, automation, and physical integration."
          techTags={[
            "Embedded systems & integration",
            "Robotics & prototype builds",
            "Software tooling & diagnostics",
            "Testable system design",
          ]}
          title={bio.frontmatter.title ?? "Alex Lucero"}
        >
          <MdxContent>{bio.content}</MdxContent>
        </AuthorityHero>,
        <SignalStripSection key="signal-strip" items={signalStripItems} />,
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
          items={workingNowItems}
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
