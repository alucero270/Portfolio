import { Box } from "@mui/material";
import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import {
  ActiveSystemsSection,
  type ActiveSystemItem,
  AuthorityHero,
  BuildPhilosophySection,
  type BuildPrinciple,
  ContactCTASection,
  EngineeringEvidenceSection,
  type LabNote,
  ProjectProcessSection,
  type ProjectProcessStep,
  SelectedWorkSection,
  ServicesSection,
  type ServiceItem,
  SignalStripSection,
  type SignalStripItem,
  ThinkingOutLoudSection,
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

const serviceItems: ServiceItem[] = [
  {
    title: "Embedded systems & integration",
    description:
      "Connect software to physical systems through explicit interfaces, telemetry, and validation. Sensor integration, microcontroller systems, data pipelines.",
  },
  {
    title: "Robotics & automation prototypes",
    description:
      "Build and stabilize systems that move, respond, and operate under real conditions. Control logic, actuation, state machines, prototype iteration.",
  },
  {
    title: "Software tooling & diagnostics",
    description:
      "Develop internal tools and AI-assisted workflows for debugging, system understanding, and operator efficiency. Analysis, introspection, practical automation.",
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

const processSteps: ProjectProcessStep[] = [
  {
    title: "Define",
    description:
      "Clarify the problem, interfaces, constraints, failure modes, and what proof would make the work trustworthy.",
  },
  {
    title: "Build",
    description:
      "Work in small reviewable passes with enough structure, notes, and validation that the system can be inspected.",
  },
  {
    title: "Launch",
    description:
      "Deploy, monitor, document, and refine the practical edges that only appear once the system is being used.",
  },
];

const labNotes: LabNote[] = [
  {
    date: "Current",
    href: toInternalHref("/projects/codex"),
    summary:
      "Retrieval and documentation workflows for keeping project decisions, procedures, and notes usable.",
    tags: ["retrieval", "docs"],
    title: "Personal knowledge workflows",
  },
  {
    date: "Current",
    href: toInternalHref("/projects/kittybot"),
    summary:
      "Companion robot planning across service boundaries, physical behavior, and local model constraints.",
    tags: ["robotics", "interfaces"],
    title: "KittyBot planning notes",
  },
  {
    date: "Current",
    href: toInternalHref("/projects/vtcn"),
    summary:
      "Telemetry platform work around sensor input, framing, persistence, and validation loops.",
    tags: ["embedded", "telemetry"],
    title: "Signal validation loops",
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

function getActivityForRepo(
  items: ActivityItemData[],
  repoLabel?: string,
): ActivityItemData | undefined {
  if (!repoLabel) {
    return undefined;
  }

  return items.find((item) => item.label?.toLowerCase().includes(repoLabel.toLowerCase()));
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
    outcome: project.outcome,
    repoLabel:
      project.repoOwner && project.repoName
        ? `${project.repoOwner}/${project.repoName}`
        : undefined,
    role: project.role,
    status: project.status,
    summary: project.summary,
    tech: project.tech,
    title: project.title,
    updated: project.updated,
  }));
  const activeSystemItems: ActiveSystemItem[] = featuredProjects.map((project) => {
    const repoLabel =
      project.repoOwner && project.repoName
        ? `${project.repoOwner}/${project.repoName}`
        : undefined;

    return {
      activity: getActivityForRepo(workingNowItems, repoLabel),
      context:
        project.outcome ??
        "Authored project context keeps the system constraints, role, and evidence visible.",
      evidenceCount: project.evidence?.length,
      focus: project.summary,
      href: toInternalHref(`/projects/${project.slug}`),
      repoLabel,
      status: project.status,
      summary: project.summary,
      tech: project.tech,
      title: project.title,
    };
  });
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
              href: "#active-systems-heading",
              label: "View active work",
              variant: "contained",
            },
            {
              href: "#case-studies-heading",
              label: "Case studies",
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
          title={
            <>
              {bio.frontmatter.title ?? "Alex Lucero"} builds{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                software
              </Box>
              , embedded systems, and automation tools.
            </>
          }
        >
          <MdxContent>{bio.content}</MdxContent>
        </AuthorityHero>,
        <SignalStripSection key="signal-strip" items={signalStripItems} />,
        <ActiveSystemsSection
          key="active-systems"
          headingId="active-systems-heading"
          systems={activeSystemItems}
        />,
        <SelectedWorkSection
          key="case-studies"
          allProjectsHref={toInternalHref("/projects")}
          eyebrow="Projects"
          headingId="case-studies-heading"
          projects={featuredProjectItems}
          title="Case Studies"
        />,
        <ServicesSection
          key="services"
          headingId="services-heading"
          items={serviceItems}
        />,
        <ProjectProcessSection
          key="project-process"
          headingId="project-process-heading"
          steps={processSteps}
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
          title="Show, don't tell"
        />,
        <ThinkingOutLoudSection
          key="thinking-out-loud"
          headingId="thinking-out-loud-heading"
          notes={labNotes}
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
