import { Box, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";
import { type ActivityItemData } from "@/components/molecules";

type RecentActivitySectionProps = {
  headingId: string;
  items?: ActivityItemData[];
  summary: string;
};

function formatActivityDate(value?: string) {
  if (!value) {
    return "now";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

export function RecentActivitySection({
  headingId,
  items = [],
  summary,
}: RecentActivitySectionProps) {
  const trackedRepoCount = new Set(items.map((item) => item.repoName ?? item.label).filter(Boolean))
    .size;
  const hasLiveItems = items.some((item) => item.href);

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        component="header"
        sx={{
          alignItems: { xs: "center", md: "flex-end" },
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          justifyContent: "space-between",
          mb: 3,
          pb: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
            <MonoLabel>S03</MonoLabel>
            <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
            <SectionEyebrow sx={{ mb: 0 }}>
              <Box
                aria-hidden
                component="span"
                sx={{
                  backgroundColor: "#7BD88F",
                  borderRadius: "50%",
                  boxShadow: "0 0 0 3px rgba(123, 216, 143, 0.16)",
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
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 660, mx: { xs: "auto", md: 0 }, mt: 1 }}
          >
            {summary}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <MonoLabel
            sx={{
              border: "1px solid rgba(123, 216, 143, 0.28)",
              borderRadius: 1,
              color: "#7BD88F",
              px: 1,
              py: 0.4,
              textTransform: "uppercase",
            }}
          >
            Live
          </MonoLabel>
          <MonoLabel
            sx={{
              border: "1px solid rgba(245, 182, 99, 0.28)",
              borderRadius: 1,
              color: "#F5B663",
              px: 1,
              py: 0.4,
              textTransform: "uppercase",
            }}
          >
            Curated
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
              background: "linear-gradient(180deg, #34343D, #202027)",
              borderBottom: "1px solid",
              borderColor: "divider",
              justifyContent: "space-between",
              px: 2,
              py: 1.25,
            }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <Stack direction="row" spacing={0.75}>
                {["rgba(255,255,255,0.18)", "rgba(255,255,255,0.18)", "#7BD88F"].map(
                  (color, index) => (
                    <Box
                      key={`${color}-${index}`}
                      aria-hidden
                      sx={{ bgcolor: color, borderRadius: "50%", height: 8, width: 8 }}
                    />
                  ),
                )}
              </Stack>
              <MonoLabel>~/alucero270 / activity</MonoLabel>
            </Stack>
            <MonoLabel sx={{ color: "#7BD88F" }}>LIVE</MonoLabel>
          </Stack>
          <Stack sx={{ px: { xs: 1.5, md: 2 }, py: 0.5 }}>
            {items.map((item) => (
              <Box
                key={`${item.label}-${item.title}`}
                component={item.href ? "a" : "div"}
                href={item.href}
                sx={{
                  alignItems: "baseline",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  color: "inherit",
                  display: "grid",
                  fontFamily: "var(--font-code)",
                  fontSize: "0.74rem",
                  gap: 1.75,
                  gridTemplateColumns: { xs: "1fr", sm: "76px minmax(0, 1fr) auto" },
                  py: 1,
                  textDecoration: "none",
                  "&:hover .activity-title": { color: "primary.main" },
                }}
              >
                <Box component="span" sx={{ color: "primary.main", fontWeight: 500 }}>
                  {item.hash ?? "local"}
                </Box>
                <Box
                  component="span"
                  className="activity-title"
                  sx={{
                    color: "text.primary",
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    transition: "color 160ms cubic-bezier(.2,.7,.3,1)",
                    whiteSpace: { sm: "nowrap" },
                  }}
                >
                  <Box component="span" sx={{ color: "text.secondary" }}>
                    {item.repoName ?? item.label?.replace(/^Live signal \//, "") ?? "local"}{" "}
                  </Box>
                  {item.title}
                </Box>
                <Box component="span" sx={{ color: "text.secondary", fontSize: "0.68rem" }}>
                  {formatActivityDate(item.occurredAt)}
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>

        <Stack spacing={2}>
          <SectionEyebrow sx={{ mb: 0 }}>About this feed</SectionEyebrow>
          <Typography color="text.secondary" variant="body2">
            The feed is a compact proof surface: live GitHub activity when credentials and network
            are available, otherwise static authored signal so export builds stay truthful.
          </Typography>
          <Card sx={{ p: 2 }}>
            <Stack spacing={1}>
              {[
                ["last fetch", hasLiveItems ? "live" : "static fallback"],
                ["repos tracked", String(trackedRepoCount || items.length)],
                ["noise filter", "bot / merge commits"],
              ].map(([label, value]) => (
                <Stack
                  key={label}
                  direction={{ xs: "column", sm: "row" }}
                  sx={{ justifyContent: "space-between", gap: { xs: 0.5, sm: 2 }, minWidth: 0 }}
                >
                  <MonoLabel>{label}</MonoLabel>
                  <MonoLabel
                    sx={{
                      color: "text.primary",
                      overflowWrap: "anywhere",
                      textAlign: { xs: "left", sm: "right" },
                      whiteSpace: "normal",
                    }}
                  >
                    {value}
                  </MonoLabel>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
