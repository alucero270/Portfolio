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
