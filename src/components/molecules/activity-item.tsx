import { Stack, Typography } from "@mui/material";

import { ExternalLink, MonoLabel } from "@/components/atoms";

export type ActivityItemData = {
  href?: string;
  label?: string;
  summary?: string;
  title: string;
};

export function ActivityItem({ href, label, summary, title }: ActivityItemData) {
  return (
    <Stack spacing={0.5}>
      {label ? <MonoLabel>{label}</MonoLabel> : null}
      <Typography component="h3" variant="h3" sx={{ fontSize: "1.1rem" }}>
        {href ? <ExternalLink href={href}>{title}</ExternalLink> : title}
      </Typography>
      {summary ? (
        <Typography color="text.secondary" sx={{ maxWidth: "64ch" }}>
          {summary}
        </Typography>
      ) : null}
    </Stack>
  );
}
