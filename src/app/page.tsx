import { Box } from "@mui/material";
import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import {
  AuthorityHero,
  BuildPhilosophySection,
  type BuildPrinciple,
  ContactCTASection,
  EngineeringEvidenceSection,
  ProjectProcessSection,
  type ProjectProcessStep,
  RecentActivitySection,
  SelectedWorkSection,
  ServicesSection,
  type ServiceItem,
  SignalStripSection,
  type SignalStripItem,
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
    glyph: "chip",
    label: "Prototype systems",
    description: "Feasibility, subsystem boundaries, bench validation, and working proofs.",
  },
  {
    glyph: "robot",
    label: "Embedded & robotics",
    description: "MCU/Linux architecture, telemetry, control interfaces, and device bring-up.",
  },
  {
    glyph: "bolt",
    label: "AI infrastructure",
    description: "Local inference, retrieval systems, agent tooling, and deterministic workflows.",
  },
  {
    glyph: "code",
    label: "Technical software",
    description: "Operational tools, APIs, data pipelines, dashboards, and integration services.",
  },
];

const serviceItems: ServiceItem[] = [
  {
    title: "Prototype systems engineering",
    description:
      "Turn ambiguous technical ideas into scoped, buildable systems with clear interfaces, validation paths, and documentation.",
    glyph: "code",
    image: "/images/placeholders/wiring-testing.jpg",
  },
  {
    title: "Embedded systems & telemetry",
    description:
      "Embedded Linux, firmware-adjacent services, sensor acquisition, framed telemetry, control boundaries, and hardware bring-up workflows.",
    glyph: "chip",
    image: "/images/placeholders/osciliscope-bench.jpg",
  },
  {
    title: "Robotics & automation platforms",
    description:
      "MCU plus Linux architectures, actuator/sensor integration, runtime coordination, observability, and simulation-aware development.",
    glyph: "robot",
    image: "/images/placeholders/stepper-motor.jpg",
  },
  {
    title: "AI infrastructure & local inference",
    description:
      "GPU/server lab architecture, retrieval systems, agent tooling, local model workflows, and AI-assisted engineering automation.",
    glyph: "bolt",
    image: "/images/placeholders/server-rack-2.jpg",
  },
  {
    title: "Industrial and technical software",
    description:
      "Backend services, engineering interfaces, internal tools, telemetry views, APIs, and integration systems for technical operations.",
    glyph: "code",
    image: "/images/placeholders/dashboard-components.jpg",
  },
  {
    title: "Infrastructure & systems operations",
    description:
      "Linux systems, networking, Docker, storage, observability, repeatable deployment, and self-hosted engineering infrastructure.",
    glyph: "chip",
    image: "/images/placeholders/linux-terminal.jpg",
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
    image: "/images/placeholders/cad-sketch.jpg",
  },
  {
    title: "Prototype & integrate",
    description:
      "Build the smallest useful proof across the relevant domains: hardware interfaces, services, telemetry, infrastructure, or AI workflow pieces.",
    image: "/images/placeholders/bread-board-dark.jpg",
  },
  {
    title: "Validate & document",
    description:
      "Test the system where it needs to operate, capture what was learned, refine the architecture, and leave behind diagrams, notes, and next-step decisions.",
    image: "/images/placeholders/osciliscope.jpg",
  },
];

const projectImageBySlug: Record<string, string> = {
  codex: "/images/placeholders/python-code.jpg",
  kittybot: "/images/placeholders/stepper-motor.jpg",
  "om606-signal-integration": "/images/placeholders/wiring-testing.jpg",
  pantheon: "/images/placeholders/server-rack.jpg",
  vtcn: "/images/placeholders/electronics-workbench.jpg",
};

const workingNowFallbackItems: ActivityItemData[] = [
  {
    hash: "local",
    label: "Curated system",
    repoName: "om606-signal-integration",
    summary:
      "Vehicle signal emulation, ECU compatibility, and validation notes for a diesel drivetrain integration.",
    title: "OM606 integration",
  },
  {
    hash: "local",
    label: "Curated system",
    repoName: "kittybot",
    summary:
      "Companion robot runtime architecture, service boundaries, and hardware/software interface contracts.",
    title: "KittyBot",
  },
  {
    hash: "local",
    label: "Curated system",
    repoName: "vtcn",
    summary:
      "Embedded Linux telemetry platform work around sensor input, framing, persistence, and validation loops.",
    title: "VTCN",
  },
];

function toWorkingNowActivityItem(activityItem: GitHubActivityItem): ActivityItemData {
  return {
    hash: activityItem.hash,
    href: activityItem.url,
    label: `Live signal / ${activityItem.label}`,
    occurredAt: activityItem.occurredAt,
    repoName: activityItem.repoName,
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
    actionLabel: "Open case study",
    evidenceCount: project.evidence?.length,
    href: toInternalHref(`/projects/${project.slug}`),
    image: projectImageBySlug[project.slug],
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
          stats={[
            { value: "3", label: "featured systems" },
            { value: "5", label: "case studies" },
            { value: "static", label: "export-ready" },
            { value: "live", label: "optional GitHub signal" },
          ]}
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
        <RecentActivitySection
          key="recent-activity"
          headingId="recent-activity-heading"
          items={workingNowItems}
          summary="Pulled from allowlisted GitHub repositories when available, with local authored context as the static-first fallback."
        />,
        <ServicesSection key="services" headingId="services-heading" items={serviceItems} />,
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
