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
  title: "Loose Arrow Labs",
  description:
    "Founder-led prototype systems engineering and technical R&D studio led by Alex Lucero.",
};

const signalStripItems: SignalStripItem[] = [
  {
    label: "Prototype systems",
    description: "Feasibility, subsystem boundaries, bench validation, and working proofs.",
  },
  {
    label: "Embedded & robotics",
    description: "MCU/Linux architecture, telemetry, control interfaces, and device bring-up.",
  },
  {
    label: "AI infrastructure",
    description: "Local inference, retrieval systems, agent tooling, and deterministic workflows.",
  },
  {
    label: "Technical software",
    description: "Operational tools, APIs, data pipelines, dashboards, and integration services.",
  },
];

const serviceItems: ServiceItem[] = [
  {
    title: "Prototype systems engineering",
    description:
      "Turn ambiguous technical ideas into scoped, buildable systems with clear interfaces, validation paths, and documentation.",
  },
  {
    title: "Embedded systems & telemetry",
    description:
      "Embedded Linux, firmware-adjacent services, sensor acquisition, framed telemetry, control boundaries, and hardware bring-up workflows.",
  },
  {
    title: "Robotics & automation platforms",
    description:
      "MCU plus Linux architectures, actuator/sensor integration, runtime coordination, observability, and simulation-aware development.",
  },
  {
    title: "AI infrastructure & local inference",
    description:
      "GPU/server lab architecture, retrieval systems, agent tooling, local model workflows, and AI-assisted engineering automation.",
  },
  {
    title: "Industrial and technical software",
    description:
      "Backend services, engineering interfaces, internal tools, telemetry views, APIs, and integration systems for technical operations.",
  },
  {
    title: "Infrastructure & systems operations",
    description:
      "Linux systems, networking, Docker, storage, observability, repeatable deployment, and self-hosted engineering infrastructure.",
  },
];

const buildPrinciples: BuildPrinciple[] = [
  {
    title: "Start with the system boundary",
    description:
      "Define interfaces, signals, ownership, constraints, and failure modes before committing to implementation details.",
  },
  {
    title: "Prototype the uncertain part first",
    description:
      "Use focused builds to test the highest-risk assumption early, whether that is timing, signal validity, data flow, or physical fit.",
  },
  {
    title: "Leave evidence behind",
    description:
      "Document tradeoffs, validation steps, operating notes, and observed behavior so the system can be inspected and safely changed later.",
  },
];

const processSteps: ProjectProcessStep[] = [
  {
    title: "Discovery & risk map",
    description:
      "Clarify the technical goal, constraints, subsystem boundaries, available hardware, and the failure modes that would make the effort unworkable.",
  },
  {
    title: "Prototype & integrate",
    description:
      "Build the smallest useful proof across the relevant domains: hardware interfaces, services, telemetry, infrastructure, or AI workflow pieces.",
  },
  {
    title: "Validate & document",
    description:
      "Test the system where it needs to operate, capture what was learned, refine the architecture, and leave behind diagrams, notes, and next-step decisions.",
  },
];

const labNotes: LabNote[] = [
  {
    date: "Current",
    href: toInternalHref("/projects/om606-signal-integration"),
    summary:
      "Reverse-engineering vehicle control expectations and validating signal behavior across mechanical and electronic systems.",
    tags: ["automotive", "signals"],
    title: "OM606 signal integration",
  },
  {
    date: "Current",
    href: toInternalHref("/projects/kittybot"),
    summary:
      "Defining robotics runtime boundaries across MCU control, Linux orchestration, telemetry, and local model constraints.",
    tags: ["robotics", "runtime"],
    title: "KittyBot architecture notes",
  },
  {
    date: "Current",
    href: toInternalHref("/projects/vtcn"),
    summary:
      "Embedded Linux telemetry work around sensor input, framing, persistence, transport, and validation loops.",
    tags: ["embedded", "telemetry"],
    title: "Telemetry validation loops",
  },
];

const workingNowFallbackItems: ActivityItemData[] = [
  {
    label: "Curated system",
    summary:
      "Vehicle signal emulation, ECU compatibility, and validation notes for a diesel drivetrain integration.",
    title: "OM606 integration",
  },
  {
    label: "Curated system",
    summary:
      "Companion robot runtime architecture, service boundaries, and hardware/software interface contracts.",
    title: "KittyBot",
  },
  {
    label: "Curated system",
    summary:
      "Embedded Linux telemetry platform work around sensor input, framing, persistence, and validation loops.",
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
    actionLabel: "Open case study",
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
      description:
        "Engineering case studies with problem framing, constraints, architecture decisions, and current status.",
      href: toInternalHref("/projects"),
      label: "Case study index",
    },
    {
      description:
        "Vehicle signal adaptation and drivetrain integration where mechanical and electrical systems meet.",
      href: toInternalHref("/projects/om606-signal-integration"),
      label: "Automotive integration proof",
    },
    {
      description:
        "Embedded Linux and telemetry work where interfaces, persistence, transport, and validation matter.",
      href: toInternalHref("/projects/vtcn"),
      label: "Embedded telemetry proof",
    },
  ];

  return (
    <HomeTemplate
      sections={[
        <AuthorityHero
          key="hero"
          ctas={[
            {
              href: "#services-heading",
              label: "View capabilities",
              variant: "contained",
            },
            {
              href: "#case-studies-heading",
              label: "Engineering case studies",
              variant: "outlined",
            },
          ]}
          eyebrow="Prototype systems engineering / embedded integration / AI infrastructure"
          headingId="home-bio-heading"
          summary="Loose Arrow Labs is a founder-led technical engineering studio for prototype systems, multidisciplinary integration, and practical R&D. The work connects software, embedded systems, infrastructure, AI tooling, and physical hardware into inspectable systems."
          techTags={[
            "Systems integration",
            "Embedded Linux & telemetry",
            "Robotics platforms",
            "AI infrastructure",
            "Technical software",
          ]}
          title={
            <>
              Loose Arrow Labs builds{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                prototype technical systems
              </Box>{" "}
              across software, hardware, and infrastructure.
            </>
          }
        >
          <MdxContent>{bio.content}</MdxContent>
        </AuthorityHero>,
        <SignalStripSection key="signal-strip" items={signalStripItems} />,
        <ServicesSection key="services" headingId="services-heading" items={serviceItems} />,
        <ActiveSystemsSection
          key="active-systems"
          headingId="active-systems-heading"
          systems={activeSystemItems}
        />,
        <SelectedWorkSection
          key="case-studies"
          allProjectsHref={toInternalHref("/projects")}
          eyebrow="Technical case studies"
          headingId="case-studies-heading"
          projects={featuredProjectItems}
          title="Systems Under Development"
          description="Project work framed by the engineering problem: constraints, subsystem boundaries, integration complexity, validation approach, and what is being learned."
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
          title="Engineering Method"
        />,
        <EngineeringEvidenceSection
          key="engineering-evidence"
          headingId="engineering-evidence-heading"
          links={evidenceLinks}
          title="Evidence Over Claims"
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
          summary="Loose Arrow Labs is in an active R&D and early consulting phase. The best-fit conversations involve a technical system, an integration boundary, a prototype need, or an engineering workflow that needs to become real."
        />,
      ]}
    />
  );
}
