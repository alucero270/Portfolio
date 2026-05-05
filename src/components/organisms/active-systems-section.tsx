import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";
import type { ActivityItemData } from "@/components/molecules";

export type ActiveSystemItem = {
  activity?: ActivityItemData;
  context?: string;
  evidenceCount?: number;
  focus?: string;
  href: string;
  repoLabel?: string;
  status?: string;
  summary: string;
  tech?: string[];
  title: string;
};

type ActiveSystemsSectionProps = {
  headingId: string;
  systems: ActiveSystemItem[];
};

function StatusBadge({ status }: { status?: string }) {
  return (
    <MonoLabel
      sx={{
        alignItems: "center",
        border: "1px solid rgba(154, 133, 255, 0.38)",
        borderRadius: 1,
        color: "primary.main",
        display: "inline-flex",
        gap: 0.75,
        px: 1.25,
        py: 0.55,
        textTransform: "uppercase",
      }}
    >
      <Box
        aria-hidden
        component="span"
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          boxShadow: "0 0 0 3px rgba(107, 76, 255, 0.16)",
          height: 6,
          width: 6,
        }}
      />
      {status ?? "Active"}
    </MonoLabel>
  );
}

export function ActiveSystemsSection({ headingId, systems }: ActiveSystemsSectionProps) {
  if (systems.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 3,
          pb: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>§04</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Core · What I&apos;m Working On</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Active systems</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
          Systems Alex is actively building or refining. Each card keeps the authored project
          context visible beside the freshest engineering signal available.
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        {systems.map((system) => (
          <Card key={system.href} component="article" sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.025), transparent)",
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
                p: { xs: 2.25, md: 3 },
              }}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={1.25}
                  useFlexGap
                  flexWrap="wrap"
                  sx={{ alignItems: "center", mb: 1 }}
                >
                  <Typography component="h3" variant="h3">
                    {system.title}
                  </Typography>
                  {system.repoLabel ? <MonoLabel>{system.repoLabel}</MonoLabel> : null}
                </Stack>
                <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                  {system.summary}
                </Typography>
              </Box>
              <Stack sx={{ alignItems: { xs: "flex-start", md: "flex-end" } }} spacing={1}>
                <StatusBadge status={system.status} />
                {system.evidenceCount ? (
                  <MonoLabel>
                    {system.evidenceCount} evidence {system.evidenceCount === 1 ? "link" : "links"}
                  </MonoLabel>
                ) : null}
              </Stack>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1.15fr" },
              }}
            >
              {[
                ["Business context", system.context ?? system.summary],
                ["Current focus", system.focus ?? system.summary],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    borderBottom: { xs: "1px solid", md: "none" },
                    borderColor: "divider",
                    borderRight: { md: "1px solid" },
                    p: { xs: 2.25, md: 3 },
                  }}
                >
                  <SectionEyebrow sx={{ mb: 1.5 }}>{label}</SectionEyebrow>
                  <Typography color="text.secondary" variant="body2">
                    {value}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ backgroundColor: "rgba(0,0,0,0.18)", p: { xs: 2.25, md: 3 } }}>
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.5 }}
                >
                  <SectionEyebrow sx={{ mb: 0 }}>
                    <Box
                      aria-hidden
                      component="span"
                      sx={{
                        backgroundColor: "#3FDB8A",
                        borderRadius: "50%",
                        boxShadow: "0 0 0 3px rgba(63, 219, 138, 0.16)",
                        display: "inline-block",
                        height: 6,
                        mr: 1,
                        verticalAlign: "middle",
                        width: 6,
                      }}
                    />
                    Recent activity
                  </SectionEyebrow>
                  {system.repoLabel ? (
                    <MonoLabel>{system.repoLabel.split("/").at(-1)}</MonoLabel>
                  ) : null}
                </Stack>
                {system.activity ? (
                  <Stack spacing={0.75}>
                    <Typography component="h4" sx={{ fontWeight: 700 }}>
                      {system.activity.title}
                    </Typography>
                    {system.activity.summary ? (
                      <Typography color="text.secondary" variant="body2">
                        {system.activity.summary}
                      </Typography>
                    ) : null}
                  </Stack>
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    No live signal is required for this card to render; authored project context
                    remains the fallback.
                  </Typography>
                )}
              </Box>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                alignItems: { xs: "flex-start", sm: "center" },
                borderTop: "1px solid",
                borderColor: "divider",
                justifyContent: "space-between",
                p: { xs: 2, md: 2.25 },
              }}
            >
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {(system.tech ?? []).slice(0, 4).map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </Stack>
              <Button href={system.href} endIcon={<ArrowForward />} sx={{ px: 0 }}>
                Open system
              </Button>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
