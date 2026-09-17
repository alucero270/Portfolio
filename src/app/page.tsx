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
  title: "Loose Arrow Labs | AI Systems & Applied Engineering",
  description:
    "Technical studio building AI infrastructure, local inference systems, AI developer tooling, and applied engineering systems.",
};

const signalStripItems: SignalStripItem[] = [
  {
    glyph: "bolt",
    label: "AI infrastructure",
    description:
      "Local inference stacks, multi-model routing, voice agents, and GPU compute management.",
  },
  {
    glyph: "code",
    label: "AI tooling",
    description:
      "Developer tooling, MCP-native systems, deterministic context, and agent infrastructure.",
  },
  {
    glyph: "chip",
    label: "Systems & infrastructure",
    description: "Linux systems, Docker, networking, storage, and documentation-driven operations.",
  },
  {
    glyph: "robot",
    label: "Applied engineering",
    description: "Embedded Linux, telemetry, prototype systems, and hardware integration.",
  },
];

const serviceItems: ServiceItem[] = [
  {
    title: "AI infrastructure & local inference",
    description:
      "Local inference stack design and operation: multi-model routing, GPU compute management, VRAM tradeoff analysis, voice agent pipelines, and self-hosted AI with explicit data sovereignty.",
    glyph: "bolt",
    image: "/images/placeholders/server-rack.jpg",
  },
  {
    title: "AI application development",
    description:
      "AI-native applications and developer tooling: MCP-integrated systems, governed project memory, deterministic context layers, agent infrastructure, and retrieval systems with auditable behavior.",
    glyph: "code",
    image: "/images/placeholders/python-code.jpg",
  },
  {
    title: "AI systems consulting",
    description:
      "Architecture review, stack selection, and operational guidance for AI systems. From local inference tradeoffs to agent workflow design — grounded in real operational experience, not vendor documentation.",
    glyph: "bolt",
    image: "/images/placeholders/dashboard-components.jpg",
  },
  {
    title: "Infrastructure & systems operations",
    description:
      "Linux systems, networking, Docker, storage, observability, and documentation-driven repeatable infrastructure. Systems designed to be recoverable, not just functional.",
    glyph: "chip",
    image: "/images/placeholders/linux-terminal.jpg",
  },
  {
    title: "Technical software & integration",
    description:
      "Backend services, engineering interfaces, internal tools, APIs, and integration systems for technical operations. Built to be maintainable and observable.",
    glyph: "code",
    image: "/images/placeholders/osciliscope-bench.jpg",
  },
  {
    title: "Prototype systems & embedded engineering",
    description:
      "Embedded Linux, firmware-adjacent services, sensor acquisition, MCU/Linux architectures, and physical prototype systems. Active R&D — work in progress.",
    glyph: "robot",
    image: "/images/placeholders/electronics-workbench.jpg",
  },
];

const buildPrinciples: BuildPrinciple[] = [
  {
    title: "Start with the system boundary",
    description:
      "Define interfaces, signals, ownership, constraints, and failure modes before committing to implementation details.",
  },
  {
    title: "Make it inspectable before making it fast",
    description:
      "Systems that can be observed, validated, and reasoned about are easier to improve than systems that are simply fast at first.",
  },
  {
    title: "Leave evidence behind",
    description:
      "Document tradeoffs, validation steps, operating notes, and observed behavior so the system can be safely changed later.",
  },
];

const processSteps: ProjectProcessStep[] = [
  {
    title: "Understand the system",
    description:
      "Clarify the technical goal, constraints, subsystem boundaries, available hardware or infrastructure, and the failure modes that would make the effort unworkable.",
    image: "/images/placeholders/cad-sketch.jpg",
  },
  {
    title: "Build or integrate",
    description:
      "Build the smallest useful proof across the relevant domains: AI infrastructure, application logic, hardware interfaces, or operational systems.",
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
  canonis: "/images/placeholders/python-code.jpg",
  anemoi: "/images/placeholders/server-rack-2.jpg",
  pantheon: "/images/placeholders/server-rack.jpg",
  codex: "/images/placeholders/dashboard-components.jpg",
  kittybot: "/images/placeholders/stepper-motor.jpg",
  "om606-signal-integration": "/images/placeholders/wiring-testing.jpg",
  vtcn: "/images/placeholders/electronics-workbench.jpg",
};

const workingNowFallbackItems: ActivityItemData[] = [
  {
    hash: "local",
    label: "Curated system",
    repoName: "pantheon",
    summary:
      "Self-hosted AI infrastructure: local inference stack, voice agent with measured latency, multi-model routing, and documentation-driven operations.",
    title: "Pantheon",
  },
  {
    hash: "local",
    label: "Curated system",
    repoName: "canonis",
    summary:
      "Governed project memory for AI-assisted development: lifecycle-managed artifacts, deterministic context assembly, and MCP server for agent integration.",
    title: "Canonis",
  },
  {
    hash: "local",
    label: "Curated system",
    repoName: "anemoi",
    summary:
      "Local AI router presenting a stable OpenAI-compatible endpoint across Ollama and llama.cpp backends with deterministic alias routing.",
    title: "Anemoi",
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
        "Governed project memory for AI agents: deterministic context, lifecycle-managed artifacts, and MCP integration built in Rust.",
      href: toInternalHref("/projects/canonis"),
      label: "AI tooling proof — Canonis",
    },
    {
      description:
        "Self-hosted AI stack with local inference, voice agent latency profiling, and documentation-driven infrastructure operations.",
      href: toInternalHref("/projects/pantheon"),
      label: "AI infrastructure proof — Pantheon",
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
          eyebrow="AI systems & infrastructure / AI developer tooling / applied engineering"
          headingId="home-bio-heading"
          stats={[
            { value: "7", label: "case studies" },
            { value: "local", label: "AI inference" },
            { value: "live", label: "GitHub signal" },
            { value: "open", label: "source work" },
          ]}
          summary="Loose Arrow Labs is a technical studio building AI infrastructure, AI developer tooling, and applied engineering systems. Work spans local inference stacks, MCP-native developer tooling, documentation-driven operations, and prototype engineering systems."
          techTags={[
            "AI infrastructure",
            "Local inference",
            "AI developer tooling",
            "Systems integration",
            "Applied engineering",
          ]}
          title={
            <>
              Loose Arrow Labs builds{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                AI systems and applied engineering tools
              </Box>{" "}
              grounded in real operational constraints.
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
          title="Active Systems"
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
          summary="Loose Arrow Labs is taking on early consulting engagements in AI infrastructure, local inference, and AI application development. Good-fit conversations involve an AI system that needs to be built, operated, or made more reliable — and a technical team that values depth over demos."
        />,
      ]}
    />
  );
}
