import { Stack } from "@mui/material";

import { MonoLabel } from "@/components/atoms";

export type RepoFreshnessData = {
  label: string;
  primaryLanguage?: string;
};

type RepoFreshnessBadgeProps = {
  freshness?: RepoFreshnessData;
};

export function RepoFreshnessBadge({ freshness }: RepoFreshnessBadgeProps) {
  if (!freshness) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
      <MonoLabel sx={{ color: "#7BD88F" }}>Live repo signal</MonoLabel>
      <MonoLabel>{freshness.label}</MonoLabel>
      {freshness.primaryLanguage ? <MonoLabel>{freshness.primaryLanguage}</MonoLabel> : null}
    </Stack>
  );
}
