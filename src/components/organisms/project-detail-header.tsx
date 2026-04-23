import { ArrowBack } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionHeading, TechTag } from "@/components/atoms";
import {
  CTAGroup,
  ProjectMetaRow,
  RepoFreshnessBadge,
  type RepoFreshnessData,
} from "@/components/molecules";

type ProjectDetailHeaderProps = {
  backHref: string;
  evidenceCount?: number;
  outcome?: string;
  repoFreshness?: RepoFreshnessData;
  repoLabel?: string;
  role?: string;
  status?: string;
  summary?: string;
  tech?: string[];
  title: string;
  updated?: string;
};

export function ProjectDetailHeader({
  backHref,
  evidenceCount,
  outcome,
  repoFreshness,
  repoLabel,
  role,
  status,
  summary,
  tech = [],
  title,
  updated,
}: ProjectDetailHeaderProps) {
  const evidenceLabel =
    evidenceCount && evidenceCount > 1 ? `${evidenceCount} evidence links` : "1 evidence link";

  return (
    <Box component="header">
      <Box sx={{ mb: 1.5 }}>
        <CTAGroup
          actions={[
            {
              href: backHref,
              label: "Back to projects",
              startIcon: <ArrowBack />,
            },
          ]}
        />
      </Box>
      <SectionHeading component="h1" variant="h1" gutterBottom>
        {title}
      </SectionHeading>
      {summary ? (
        <Typography color="text.secondary" sx={{ maxWidth: 820, mb: 2 }}>
          {summary}
        </Typography>
      ) : null}
      <Stack spacing={1.25}>
        <ProjectMetaRow status={status} updated={updated} />
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
    </Box>
  );
}
