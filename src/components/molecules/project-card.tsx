import { ArrowForward } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, TechTag } from "@/components/atoms";

import { CTAGroup } from "./cta-group";
import { ProjectMetaRow } from "./project-meta-row";
import { RepoFreshnessBadge, type RepoFreshnessData } from "./repo-freshness-badge";

export type ProjectCardData = {
  actionLabel?: string;
  evidenceCount?: number;
  href: string;
  outcome?: string;
  repoLabel?: string;
  repoFreshness?: RepoFreshnessData;
  role?: string;
  status?: string;
  summary: string;
  tech?: string[];
  title: string;
  updated?: string;
};

type ProjectCardProps = ProjectCardData & {
  headingComponent?: "h2" | "h3";
};

function ProjectVisualMock({
  repoLabel,
  tech,
  title,
}: {
  repoLabel?: string;
  tech: string[];
  title: string;
}) {
  const lowerTitle = title.toLowerCase();
  const kind = lowerTitle.includes("kitty")
    ? "robotics"
    : lowerTitle.includes("vtcn") || lowerTitle.includes("signal")
      ? "telemetry"
      : lowerTitle.includes("pantheon")
        ? "infra"
        : "software";

  return (
    <Box
      aria-hidden
      sx={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(107,76,255,0.18), transparent 34%), #0F0F17",
        borderBottom: "1px solid",
        borderColor: "divider",
        height: { xs: 156, md: 172 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      {kind === "telemetry" ? (
        <Box sx={{ inset: 0, p: 2, position: "absolute" }}>
          <Stack direction="row" spacing={1} sx={{ height: "100%", alignItems: "end" }}>
            {[36, 68, 44, 88, 58, 112, 74, 98].map((height, index) => (
              <Box
                key={`${height}-${index}`}
                sx={{
                  bgcolor: index % 3 === 0 ? "primary.main" : "rgba(63,219,138,0.55)",
                  borderRadius: "2px 2px 0 0",
                  flex: 1,
                  height,
                  opacity: 0.82,
                }}
              />
            ))}
          </Stack>
        </Box>
      ) : kind === "robotics" ? (
        <Box sx={{ inset: 0, position: "absolute" }}>
          <Box
            sx={{
              border: "1px solid rgba(154,133,255,0.55)",
              borderRadius: "50%",
              height: 92,
              left: "50%",
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 92,
            }}
          />
          {[
            ["18%", "26%"],
            ["70%", "24%"],
            ["28%", "72%"],
            ["74%", "70%"],
          ].map(([left, top], index) => (
            <Box
              key={`${left}-${top}`}
              sx={{
                bgcolor: index % 2 ? "primary.main" : "#3FDB8A",
                borderRadius: "50%",
                height: 10,
                left,
                position: "absolute",
                top,
                width: 10,
              }}
            />
          ))}
        </Box>
      ) : kind === "infra" ? (
        <Box sx={{ p: 2 }}>
          {[0, 1, 2].map((row) => (
            <Box
              key={row}
              sx={{
                alignItems: "center",
                border: "1px solid",
                borderColor: row === 1 ? "rgba(154,133,255,0.5)" : "divider",
                borderRadius: 1,
                display: "flex",
                gap: 1,
                mb: 1,
                p: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: row === 1 ? "#3FDB8A" : "primary.main",
                  borderRadius: "50%",
                  height: 7,
                  width: 7,
                }}
              />
              <Box
                sx={{
                  bgcolor: "rgba(200,200,214,0.2)",
                  borderRadius: 1,
                  height: 6,
                  width: `${50 + row * 12}%`,
                }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              bgcolor: "#1A1A26",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              color: "text.secondary",
              fontFamily: "var(--font-code)",
              fontSize: "0.72rem",
              p: 1.25,
            }}
          >
            <Box component="span" sx={{ color: "primary.main" }}>
              &gt;
            </Box>{" "}
            inspect system boundary_
          </Box>
          {[0, 1, 2].map((row) => (
            <Box
              key={row}
              sx={{
                bgcolor: row === 0 ? "rgba(107,76,255,0.12)" : "transparent",
                borderRadius: 0.5,
                display: "flex",
                justifyContent: "space-between",
                mt: 1,
                px: 1,
                py: 0.65,
              }}
            >
              <MonoLabel sx={{ color: "text.primary" }}>
                {tech[row] ?? repoLabel ?? "artifact"}
              </MonoLabel>
              <MonoLabel sx={{ color: "primary.main" }}>{(0.92 - row * 0.1).toFixed(2)}</MonoLabel>
            </Box>
          ))}
        </Box>
      )}
      <MonoLabel
        sx={{
          bottom: 12,
          color: "text.secondary",
          left: 16,
          position: "absolute",
        }}
      >
        {repoLabel ?? "authored project"}
      </MonoLabel>
    </Box>
  );
}

export function ProjectCard({
  actionLabel = "Open project",
  evidenceCount,
  headingComponent = "h2",
  href,
  outcome,
  repoFreshness,
  repoLabel,
  role,
  status,
  summary,
  tech = [],
  title,
  updated,
}: ProjectCardProps) {
  const evidenceLabel =
    evidenceCount && evidenceCount > 1 ? `${evidenceCount} evidence links` : "1 evidence link";

  return (
    <Card component="article" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ProjectVisualMock repoLabel={repoLabel} tech={tech} title={title} />
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.25,
        }}
      >
        <MonoLabel sx={{ color: "primary.main" }}>Curated project</MonoLabel>
        {status ? <MonoLabel>{status}</MonoLabel> : null}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          component={headingComponent}
          variant="h3"
          sx={{ fontSize: headingComponent === "h2" ? "1.45rem" : "1.35rem", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {summary}
        </Typography>
        <Stack spacing={1.25}>
          <ProjectMetaRow updated={updated} />
          {role ? <Typography color="text.secondary">Role: {role}</Typography> : null}
          {outcome ? <Typography color="text.secondary">Outcome: {outcome}</Typography> : null}
          {tech.length > 0 ? (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {tech.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </Stack>
          ) : null}
          {repoLabel ? <MonoLabel>{repoLabel}</MonoLabel> : null}
          <RepoFreshnessBadge freshness={repoFreshness} />
          {evidenceCount ? <MonoLabel>{evidenceLabel}</MonoLabel> : null}
        </Stack>
      </CardContent>
      <CardActions>
        <CTAGroup
          actions={[
            {
              endIcon: <ArrowForward />,
              href,
              label: actionLabel,
            },
          ]}
        />
      </CardActions>
    </Card>
  );
}
