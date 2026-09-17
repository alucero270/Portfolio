import { Stack } from "@mui/material";

import { MonoLabel } from "@/components/atoms";

export type RepoFreshnessData = {
  label: string;
  primaryLanguage?: string;
  repoPrivate?: boolean;
};

type RepoFreshnessBadgeProps = {
  freshness?: RepoFreshnessData;
};

export function RepoFreshnessBadge({ freshness }: RepoFreshnessBadgeProps) {
  if (!freshness) {
    return null;
  }

  const isPrivate = freshness.repoPrivate === true;

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
      <MonoLabel sx={{ color: isPrivate ? "#8A94A6" : "#7BD88F" }}>
        {isPrivate ? "Private repo" : "Live repo signal"}
      </MonoLabel>
      <MonoLabel>{freshness.label}</MonoLabel>
      {freshness.primaryLanguage ? <MonoLabel>{freshness.primaryLanguage}</MonoLabel> : null}
    </Stack>
  );
}
