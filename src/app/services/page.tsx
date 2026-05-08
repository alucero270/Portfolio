import { Box, Card, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

import { MonoLabel, SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";
import { ServicesSection, type ServiceItem } from "@/components/organisms";
import { toInternalHref } from "@/lib/routing";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Prototype systems engineering, embedded integration, AI infrastructure, technical software, and R&D support from Loose Arrow Labs.",
};

const serviceItems: ServiceItem[] = [
  {
    id: "prototype-systems",
    title: "Prototype systems engineering",
    description:
      "Concept-to-proof work for technical systems: architecture, subsystem boundaries, integration plans, risk mapping, and validation artifacts.",
  },
  {
    id: "embedded-telemetry",
    title: "Embedded systems & telemetry",
    description:
      "Embedded Linux services, firmware-adjacent interfaces, sensor acquisition, framed telemetry, local persistence, and field-oriented validation.",
  },
  {
    id: "robotics-automation",
    title: "Robotics & automation platforms",
    description:
      "MCU/Linux runtime separation, actuator and sensor interfaces, simulation modes, observability, and control-system integration.",
  },
  {
    id: "ai-infrastructure",
    title: "AI infrastructure & local inference",
    description:
      "GPU/server lab architecture, local model workflows, retrieval systems, agent tooling, and AI-assisted engineering automation.",
  },
  {
    id: "technical-software",
    title: "Technical software & integrations",
    description:
      "Backend services, APIs, engineering dashboards, internal tools, telemetry viewers, and systems that connect hardware to operations.",
  },
  {
    id: "linux-operations",
    title: "Linux infrastructure & operations",
    description:
      "Networking, Docker, storage, observability, self-hosted services, repeatable deployment, and maintainable engineering environments.",
  },
];

const verticals = [
  { label: "Automotive", tags: ["ECU adaptation", "signal emulation", "drivetrain telemetry"] },
  { label: "Robotics", tags: ["MCU + Linux", "actuator control", "runtime systems"] },
  { label: "Industrial IoT", tags: ["sensor networks", "edge processing", "telemetry transport"] },
  { label: "AI infrastructure", tags: ["local inference", "GPU systems", "retrieval workflows"] },
  { label: "Engineering operations", tags: ["Linux", "observability", "repeatable ops"] },
  { label: "CAD & fabrication", tags: ["3D printing", "bench fixtures", "physical iteration"] },
];

const technologySubjects = [
  {
    id: "device-interfaces",
    category: "01. Tech Stack",
    label: "Embedded & control",
    description:
      "Device-side foundations for telemetry, control boundaries, and hardware bring-up.",
    tools: [
      "C/C++",
      "Embedded Linux",
      "BeagleBone Black",
      "STM32 / Arduino-class MCUs",
      "GPIO / I2C / SPI / UART",
      "systemd",
    ],
  },
  {
    id: "ai-workflows",
    category: "01. Tech Stack",
    label: "AI infrastructure",
    description: "Local model and retrieval workflows designed around inspectable engineering use.",
    tools: [
      "Python",
      "Local LLM workflows",
      "RAG pipelines",
      "Vector / full-text search",
      "GPU compute",
      "Agent tooling",
    ],
  },
  {
    id: "application-systems",
    category: "01. Tech Stack",
    label: "Technical software",
    description:
      "Application and integration layers for tools, dashboards, APIs, and operational views.",
    tools: [
      "C# / .NET",
      "TypeScript",
      "React / Next.js",
      "REST APIs",
      "SQLite",
      "Structured logging",
    ],
  },
  {
    id: "infrastructure",
    category: "03. Infrastructure",
    label: "Infrastructure & operations",
    description: "The operating layer for repeatable development, local services, and lab systems.",
    tools: [
      "Linux",
      "Docker",
      "Networking / VLAN concepts",
      "Storage systems",
      "Observability",
      "GitHub Actions",
    ],
  },
  {
    id: "fabrication",
    category: "04. Physical Systems",
    label: "Fabrication-aware workflows",
    description: "Physical iteration and bench validation around the software/hardware boundary.",
    tools: [
      "CAD planning",
      "3D printing",
      "Bench wiring",
      "Signal validation",
      "Test fixtures",
      "Mechanical packaging",
    ],
  },
  {
    id: "data-stores",
    category: "02. Data Stores",
    label: "Persistence & retrieval",
    description:
      "Storage choices for telemetry buffers, engineering notes, search, and operational state.",
    tools: [
      "SQLite",
      "Markdown content",
      "Vector indexes",
      "Full-text search",
      "Structured logs",
      "Local artifacts",
    ],
  },
];

const engagementSteps = [
  {
    step: "01",
    title: "Technical discovery",
    body: "Map the system, interfaces, constraints, materials, data paths, unknowns, and risks before assuming what needs to be built.",
  },
  {
    step: "02",
    title: "Focused prototype",
    body: "Build the smallest integrated proof that exercises the uncertain boundary: signal, sensor, actuator, service, model, network, or workflow.",
  },
  {
    step: "03",
    title: "Validation package",
    body: "Document architecture, tradeoffs, test notes, operating assumptions, and recommended next steps so the work is inspectable.",
  },
];

export default function ServicesPage() {
  return (
    <Stack spacing={7}>
      <Box component="header">
        <SectionEyebrow sx={{ mb: 1.5 }}>Loose Arrow Labs</SectionEyebrow>
        <SectionHeading component="h1" variant="h1" sx={{ maxWidth: 820, mb: 2 }}>
          Prototype systems engineering and technical R&D
        </SectionHeading>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "1.1rem", lineHeight: 1.6, maxWidth: 720 }}
        >
          Founder-led engineering support for systems that do not fit cleanly into one discipline:
          embedded devices, robotics platforms, technical software, local AI infrastructure, Linux
          systems, and hardware-aware prototypes.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CTAGroup
            actions={[
              {
                href: toInternalHref("/contact"),
                label: "Discuss a system",
                variant: "contained",
              },
              { href: toInternalHref("/projects"), label: "See case studies", variant: "outlined" },
            ]}
          />
        </Box>
      </Box>

      <ServicesSection headingId="services-list-heading" items={serviceItems} />

      <Box component="section" aria-labelledby="technology-heading">
        <Box
          component="header"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>S07</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
            <SectionEyebrow sx={{ mb: 0 }}>Technology Stack</SectionEyebrow>
          </Stack>
          <SectionHeading id="technology-heading">Technology used across projects</SectionHeading>
          <Typography color="text.secondary" sx={{ maxWidth: 720, mt: 1 }}>
            The stack is selected by system constraints, not trend fit. These are the tools and
            platforms currently shaping Loose Arrow Labs project work.
          </Typography>
        </Box>

        {technologySubjects.map((subject, index) => (
          <Box
            key={subject.id}
            id={`${subject.id}-input`}
            className="technology-radio"
            component="input"
            type="radio"
            name="technology-subject"
            defaultChecked={index === 0}
            sx={{ position: "absolute" }}
          />
        ))}

        <Card className="technology-explorer-card" sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.6fr" },
            }}
          >
            <Stack
              component="aside"
              spacing={1.2}
              sx={{
                borderBottom: { xs: "1px solid", md: "none" },
                borderColor: "divider",
                borderRight: { md: "1px solid" },
                p: { xs: 2.5, md: 3.5 },
              }}
            >
              {technologySubjects.map((subject) => (
                <Box
                  key={subject.id}
                  className={`technology-option technology-option-${subject.id}`}
                  component="label"
                  htmlFor={`${subject.id}-input`}
                  sx={{
                    borderRadius: 1,
                    cursor: "pointer",
                    display: "grid",
                    gap: 0.4,
                    px: 1.25,
                    py: 1,
                    transition: "background-color 160ms ease, color 160ms ease",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "inherit",
                      fontFamily: "var(--font-display)",
                      fontSize: { xs: "1rem", md: "1.05rem" },
                      fontWeight: 700,
                    }}
                  >
                    {subject.label}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: "text.secondary",
                      fontFamily: "var(--font-code)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {subject.category}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack
              spacing={0}
              sx={{
                minHeight: { md: 360 },
                p: { xs: 2.5, md: 3.5 },
              }}
            >
              {technologySubjects.map((subject) => (
                <Box
                  key={subject.id}
                  className={`technology-panel technology-panel-${subject.id}`}
                  sx={{
                    display: "none",
                  }}
                >
                  <SectionEyebrow>{subject.category}</SectionEyebrow>
                  <SectionHeading component="h3" sx={{ fontSize: "1.8rem", mt: 1 }}>
                    {subject.label}
                  </SectionHeading>
                  <Typography color="text.secondary" sx={{ maxWidth: 620, mb: 3, mt: 1 }}>
                    {subject.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.25,
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        lg: "repeat(3, minmax(0, 1fr))",
                      },
                    }}
                  >
                    {subject.tools.map((tool) => (
                      <Box
                        key={tool}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",
                          minHeight: 84,
                          p: 1.75,
                        }}
                      >
                        <TechTag label={tool} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>

      <Box component="section" aria-labelledby="verticals-heading">
        <Box
          component="header"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>S08</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
            <SectionEyebrow sx={{ mb: 0 }}>Operating Domains</SectionEyebrow>
          </Stack>
          <SectionHeading id="verticals-heading">Where the work fits</SectionHeading>
          <Typography color="text.secondary" sx={{ maxWidth: 700, mt: 1 }}>
            The through-line is integration: hardware, software, infrastructure, and data moving as
            one practical technical system.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 0,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {verticals.map((v, i) => (
            <Card
              key={v.label}
              sx={{
                borderRadius: 0,
                border: "none",
                borderRight: { md: (i + 1) % 3 !== 0 ? "1px solid" : "none" },
                borderBottom:
                  i < verticals.length - (verticals.length % 3 || 3) ? "1px solid" : "none",
                borderColor: "divider",
                backgroundColor: "background.paper",
                backgroundImage: "none",
                p: 3,
                "&:hover": { backgroundColor: "background.paper", transform: "none" },
              }}
            >
              <MonoLabel sx={{ color: "primary.main", display: "block", mb: 1.5 }}>
                {String(i + 1).padStart(2, "0")}
              </MonoLabel>
              <Typography sx={{ fontWeight: 600, mb: 1.5 }}>{v.label}</Typography>
              <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                {v.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>

      <Box component="section" aria-labelledby="approach-heading">
        <Box
          component="header"
          sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>S09</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
            <SectionEyebrow sx={{ mb: 0 }}>Engagement Model</SectionEyebrow>
          </Stack>
          <SectionHeading id="approach-heading">What working together looks like</SectionHeading>
        </Box>
        <Stack spacing={2}>
          {engagementSteps.map(({ step, title, body }) => (
            <Stack
              key={step}
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                pb: 2.5,
                "&:last-of-type": { borderBottom: "none", pb: 0 },
              }}
            >
              <MonoLabel sx={{ color: "primary.main", minWidth: 28 }}>{step}</MonoLabel>
              <Box>
                <Typography sx={{ fontWeight: 600, mb: 0.75 }}>{title}</Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {body}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box
        component="section"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        <SectionHeading component="h2" sx={{ mb: 1.5 }}>
          Have a system that needs to become real?
        </SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 620, mx: "auto", mb: 3 }}>
          Bring the constraint, the hardware, the workflow, or the messy integration boundary. The
          first useful output is often a clearer architecture and a validation plan.
        </Typography>
        <CTAGroup
          actions={[
            {
              href: toInternalHref("/contact"),
              label: "Start with the problem",
              variant: "contained",
            },
          ]}
        />
      </Box>
    </Stack>
  );
}
