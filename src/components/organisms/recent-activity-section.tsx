import { Box, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";
import { ActivityItem, type ActivityItemData } from "@/components/molecules";

type RecentActivitySectionProps = {
  headingId: string;
  items?: ActivityItemData[];
  summary: string;
};

export function RecentActivitySection({
  headingId,
  items = [],
  summary,
}: RecentActivitySectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        component="header"
        sx={{
          alignItems: { xs: "flex-start", md: "flex-end" },
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          justifyContent: "space-between",
          mb: 3,
          pb: 2,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>§03</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
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
              Live Signal
            </SectionEyebrow>
          </Stack>
          <SectionHeading id={headingId}>Recent activity</SectionHeading>
          <Typography color="text.secondary" sx={{ maxWidth: 660, mt: 1 }}>
            {summary}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <MonoLabel
            sx={{
              border: "1px solid rgba(63, 219, 138, 0.28)",
              borderRadius: 1,
              color: "#3FDB8A",
              px: 1,
              py: 0.4,
              textTransform: "uppercase",
            }}
          >
            Live
          </MonoLabel>
          <MonoLabel
            sx={{
              border: "1px solid rgba(212, 160, 64, 0.28)",
              borderRadius: 1,
              color: "#D4A040",
              px: 1,
              py: 0.4,
              textTransform: "uppercase",
            }}
          >
            Curated fallback
          </MonoLabel>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 320px" },
        }}
      >
        <Card sx={{ overflow: "hidden" }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              background: "linear-gradient(180deg, #1A1A26, #14141E)",
              borderBottom: "1px solid",
              borderColor: "divider",
              justifyContent: "space-between",
              px: 2,
              py: 1.25,
            }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <Stack direction="row" spacing={0.75}>
                {["#3A3A4D", "#3A3A4D", "#3FDB8A"].map((color, index) => (
                  <Box
                    key={`${color}-${index}`}
                    aria-hidden
                    sx={{ bgcolor: color, borderRadius: "50%", height: 8, width: 8 }}
                  />
                ))}
              </Stack>
              <MonoLabel>~/alucero270 · activity</MonoLabel>
            </Stack>
            <MonoLabel sx={{ color: "#3FDB8A" }}>LIVE</MonoLabel>
          </Stack>
          <Stack sx={{ p: { xs: 1.5, md: 2 } }} spacing={1.25}>
            {items.map((item) => (
              <ActivityItem key={`${item.label}-${item.title}`} {...item} />
            ))}
          </Stack>
        </Card>

        <Stack spacing={2}>
          <SectionEyebrow sx={{ mb: 0 }}>About this feed</SectionEyebrow>
          <Typography color="text.secondary" variant="body2">
            Pulled from the allowlisted GitHub repositories when available. Static export and API
            failures keep the local authored fallback instead.
          </Typography>
          <Card sx={{ p: 2 }}>
            <Stack spacing={1}>
              {[
                ["source", "allowlisted repos"],
                ["noise filter", "bot / merge commits"],
                ["fallback", "local authored signal"],
              ].map(([label, value]) => (
                <Stack key={label} direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
                  <MonoLabel>{label}</MonoLabel>
                  <MonoLabel sx={{ color: "text.primary", textAlign: "right" }}>{value}</MonoLabel>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
