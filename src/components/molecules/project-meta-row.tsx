import { Stack } from "@mui/material";

import { MonoLabel, StatusChip } from "@/components/atoms";

type ProjectMetaRowProps = {
  status?: string;
  updated?: string;
};

export function ProjectMetaRow({ status, updated }: ProjectMetaRowProps) {
  if (!status && !updated) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
      {status ? <StatusChip label={status} /> : null}
      {updated ? <MonoLabel>Updated {updated}</MonoLabel> : null}
    </Stack>
  );
}
