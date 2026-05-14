import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

type ContactCTASectionProps = {
  contactHref: string;
  headingId: string;
  summary: string;
};

export function ContactCTASection({ contactHref, headingId, summary }: ContactCTASectionProps) {
  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 3,
          pb: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, mb: 1.5 }}
        >
          <MonoLabel>S11</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Engagement</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Start with the system</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mx: { xs: "auto", md: 0 }, mt: 1 }}>
          {summary}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(180deg, rgba(26,26,31,0.08), rgba(26,26,31,0.78)), url(/images/placeholders/wiring-testing.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          minHeight: { xs: 220, md: 300 },
          mb: 2.5,
          overflow: "hidden",
          p: { xs: 3, md: 5 },
          position: "relative",
        }}
      >
        <Stack
          sx={{
            height: "100%",
            justifyContent: "center",
            maxWidth: 580,
            minHeight: { xs: 164, md: 220 },
          }}
        >
          <SectionEyebrow sx={{ color: "#fff", mb: 1 }}>Build cool things</SectionEyebrow>
          <Typography
            component="h3"
            sx={{
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontSize: { xs: "1.8rem", md: "2.35rem" },
              fontWeight: 700,
              lineHeight: 1.12,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            Got a problem worth shipping?
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionEyebrow>Write to me</SectionEyebrow>
            <Typography component="h3" variant="h3" sx={{ mt: 1 }}>
              Tell me about it.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
              A few lines is enough. Reply within 48 hours.
            </Typography>
            <Box
              sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}
            >
              <TextField label="Name" placeholder="your name" size="small" />
              <TextField label="Email" placeholder="you@company.com" size="small" />
            </Box>
            <SectionEyebrow sx={{ mt: 2, mb: 1 }}>Project type</SectionEyebrow>
            <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
              {["MVP", "AI System", "Internal Tool", "System recovery", "Other"].map((item) => (
                <Button
                  key={item}
                  size="small"
                  variant={item === "AI System" ? "contained" : "outlined"}
                  sx={{ fontFamily: "var(--font-code)", fontSize: "0.68rem" }}
                >
                  {item}
                </Button>
              ))}
            </Stack>
            <TextField
              label="What are you trying to solve?"
              multiline
              minRows={4}
              placeholder="A few lines is enough - we'll dig in on a call."
              size="small"
              sx={{ mt: 2 }}
              fullWidth
            />
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between", mt: 2.5 }}
            >
              <MonoLabel>no newsletter / ever</MonoLabel>
              <Button href={contactHref} endIcon={<ArrowForward />} variant="contained">
                Send
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <SectionEyebrow>Or / book a call</SectionEyebrow>
            <Typography component="h3" variant="h3" sx={{ mt: 1 }}>
              30-min intro.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
              No pitch. We talk through the problem and see if it is a fit.
            </Typography>
            <Box sx={{ display: "grid", gap: 0.75, gridTemplateColumns: "repeat(7, 1fr)" }}>
              {[
                ["MON", "5"],
                ["TUE", "6"],
                ["WED", "7"],
                ["THU", "8"],
                ["FRI", "9"],
                ["SAT", "10"],
                ["SUN", "11"],
              ].map(([day, date]) => (
                <Box
                  key={day}
                  sx={{
                    backgroundColor: day === "TUE" ? "primary.main" : "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  <MonoLabel sx={{ color: day === "TUE" ? "#fff" : "text.secondary" }}>
                    {day}
                  </MonoLabel>
                  <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 700, mt: 0.35 }}>
                    {date}
                  </Typography>
                </Box>
              ))}
            </Box>
            <MonoLabel sx={{ display: "block", mt: 2 }}>Tue May 6 / UTC-5 / 5 slots</MonoLabel>
            <Box
              sx={{ display: "grid", gap: 0.75, gridTemplateColumns: "repeat(5, 1fr)", mt: 1.25 }}
            >
              {["9:00", "10:30", "13:00", "14:30", "16:00"].map((slot) => (
                <Box
                  key={slot}
                  sx={{
                    border: "1px solid",
                    borderColor: slot === "13:00" ? "primary.main" : "divider",
                    borderRadius: 1,
                    color: slot === "13:00" ? "primary.main" : "text.secondary",
                    fontFamily: "var(--font-code)",
                    fontSize: "0.76rem",
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  {slot}
                </Box>
              ))}
            </Box>
            <Stack direction="row" sx={{ justifyContent: "space-between", mt: 3 }}>
              <MonoLabel>or email /</MonoLabel>
              <Button href={contactHref} size="small" variant="outlined">
                Contact
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
