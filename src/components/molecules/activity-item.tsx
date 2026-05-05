import { Box, Stack, Typography } from "@mui/material";

import { ExternalLink, MonoLabel } from "@/components/atoms";

export type ActivityItemData = {
  href?: string;
  label?: string;
  summary?: string;
  title: string;
};

export function ActivityItem({ href, label, summary, title }: ActivityItemData) {
  return (
    <Stack
      spacing={0.75}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
        backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))",
        p: { xs: 2, md: 2.25 },
        position: "relative",
      }}
    >
      <Box
        aria-hidden
        sx={{
          backgroundColor: label?.toLowerCase().includes("live") ? "#7BD88F" : "primary.main",
          borderRadius: "999px",
          boxShadow: label?.toLowerCase().includes("live")
            ? "0 0 0 3px rgba(123, 216, 143, 0.16)"
            : "0 0 0 3px rgba(155, 124, 255, 0.14)",
          height: 6,
          left: 16,
          position: "absolute",
          top: 18,
          width: 6,
        }}
      />
      {label ? <MonoLabel sx={{ pl: 2 }}>{label}</MonoLabel> : null}
      <Typography component="h3" variant="h3" sx={{ fontSize: "1rem", lineHeight: 1.35 }}>
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
