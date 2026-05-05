import { ArrowForward } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";

export type LabNote = {
  date: string;
  href: string;
  summary: string;
  tags: string[];
  title: string;
};

type ThinkingOutLoudSectionProps = {
  headingId: string;
  notes: LabNote[];
};

export function ThinkingOutLoudSection({ headingId, notes }: ThinkingOutLoudSectionProps) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 1, pb: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>§10</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Lab · R&D</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Thinking out loud</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
          Experiments, notes, and small proof artifacts that show how the work is being reasoned
          through before it becomes a polished case study.
        </Typography>
      </Box>

      <Stack>
        {notes.map((note) => (
          <Box
            key={note.title}
            component="a"
            href={note.href}
            sx={{
              alignItems: { xs: "flex-start", md: "center" },
              borderBottom: "1px solid",
              borderColor: "divider",
              color: "inherit",
              display: "grid",
              gap: { xs: 1.5, md: 3 },
              gridTemplateColumns: { xs: "1fr", md: "1.15fr minmax(0, 2fr) auto auto" },
              py: 2.5,
              textDecoration: "none",
              "&:hover h3": { color: "primary.main" },
            }}
          >
            <Typography component="h3" sx={{ fontSize: "1rem", fontWeight: 700 }}>
              {note.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {note.summary}
            </Typography>
            <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
              {note.tags.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </Stack>
            <MonoLabel sx={{ alignItems: "center", display: "inline-flex", gap: 0.5 }}>
              {note.date}
              <ArrowForward sx={{ fontSize: "0.9rem" }} />
            </MonoLabel>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
