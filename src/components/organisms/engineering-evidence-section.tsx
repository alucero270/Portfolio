import { ArrowForward } from "@mui/icons-material";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";
import { type EvidenceLink } from "@/components/molecules";

type EngineeringEvidenceSectionProps = {
  headingId: string;
  links?: EvidenceLink[];
  title?: string;
};

export function EngineeringEvidenceSection({
  headingId,
  links = [],
  title = "Engineering Evidence",
}: EngineeringEvidenceSectionProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 3, pb: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>§09</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Proof</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>{title}</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 640, mt: 1 }}>
          Repos, project notes, and written evidence. The useful artifacts stay visible without
          turning the page into a metrics board.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {links.slice(0, 3).map((link, index) => (
          <Card
            key={link.href}
            component="a"
            href={link.href}
            sx={{
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            <Box
              aria-hidden
              sx={{
                backgroundColor: "#0F0F17",
                borderBottom: "1px solid",
                borderColor: "divider",
                height: 150,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {index === 0 ? (
                <Box sx={{ p: 2 }}>
                  <MonoLabel sx={{ color: "text.primary" }}>alucero270 / proof surface</MonoLabel>
                  <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                    <MonoLabel>TypeScript</MonoLabel>
                    <MonoLabel sx={{ color: "#3FDB8A" }}>Public</MonoLabel>
                  </Stack>
                  <Box sx={{ display: "flex", height: 6, mt: 2, overflow: "hidden" }}>
                    <Box sx={{ bgcolor: "#3178C6", flex: 6 }} />
                    <Box sx={{ bgcolor: "#E34C26", flex: 2 }} />
                    <Box sx={{ bgcolor: "primary.main", flex: 1 }} />
                  </Box>
                </Box>
              ) : index === 1 ? (
                <Box component="svg" viewBox="0 0 280 150" sx={{ height: "100%", width: "100%" }}>
                  <rect
                    x="22"
                    y="30"
                    width="56"
                    height="24"
                    rx="4"
                    fill="#1A1A26"
                    stroke="#2A2A39"
                  />
                  <rect
                    x="22"
                    y="94"
                    width="56"
                    height="24"
                    rx="4"
                    fill="#1A1A26"
                    stroke="#2A2A39"
                  />
                  <rect
                    x="118"
                    y="58"
                    width="76"
                    height="34"
                    rx="4"
                    fill="#1A1A26"
                    stroke="#6B4CFF"
                  />
                  <rect
                    x="222"
                    y="64"
                    width="42"
                    height="24"
                    rx="4"
                    fill="#1A1A26"
                    stroke="#2A2A39"
                  />
                  <line x1="78" y1="42" x2="118" y2="75" stroke="#8A8AA0" strokeDasharray="3 3" />
                  <line x1="78" y1="106" x2="118" y2="75" stroke="#8A8AA0" strokeDasharray="3 3" />
                  <line x1="194" y1="75" x2="222" y2="76" stroke="#8A8AA0" strokeDasharray="3 3" />
                </Box>
              ) : (
                <Box sx={{ p: 2 }}>
                  {[64, 92, 86, 70, 90, 48].map((width, lineIndex) => (
                    <Box
                      key={width}
                      sx={{
                        bgcolor: lineIndex === 0 ? "text.secondary" : "rgba(200,200,214,0.18)",
                        borderRadius: 1,
                        height: lineIndex === 0 ? 7 : 5,
                        mb: 1,
                        width: `${width}%`,
                      }}
                    />
                  ))}
                  <Box
                    sx={{
                      border: "1px solid rgba(154,133,255,0.35)",
                      borderRadius: 1,
                      color: "primary.main",
                      fontFamily: "var(--font-code)",
                      fontSize: "0.68rem",
                      mt: 2,
                      p: 1,
                    }}
                  >
                    tradeoff note / validation path
                  </Box>
                </Box>
              )}
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <SectionEyebrow sx={{ mb: 1 }}>{link.type ?? "Evidence"}</SectionEyebrow>
              <Typography component="h3" sx={{ fontWeight: 700 }}>
                {link.label}
              </Typography>
              {link.description ? (
                <Typography color="text.secondary" variant="body2" sx={{ mt: 0.75 }}>
                  {link.description}
                </Typography>
              ) : null}
              <MonoLabel sx={{ alignItems: "center", display: "inline-flex", gap: 0.5, mt: 1.5 }}>
                Open artifact
                <ArrowForward sx={{ fontSize: "0.9rem" }} />
              </MonoLabel>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
