import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { MonoLabel, SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";
import { CTAGroup } from "@/components/molecules";

type HeroCTA = {
  href: string;
  label: string;
  variant?: "contained" | "outlined" | "text";
};

type AuthorityHeroProps = {
  children: ReactNode;
  ctas?: HeroCTA[];
  eyebrow?: string;
  headingId: string;
  summary?: string;
  techTags?: string[];
  title: ReactNode;
};

export function AuthorityHero({
  children,
  ctas = [],
  eyebrow,
  headingId,
  summary,
  techTags = [],
  title,
}: AuthorityHeroProps) {
  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{
        alignItems: "center",
        display: "grid",
        gap: { xs: 4, md: 7 },
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(320px, 0.85fr)" },
        minHeight: { md: 560 },
        py: { xs: 3, md: 6 },
      }}
    >
      <Stack spacing={2.75}>
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        <SectionHeading id={headingId} component="h1" variant="h1" sx={{ maxWidth: 860 }}>
          {title}
        </SectionHeading>
        {summary ? (
          <Typography
            component="p"
            variant="h2"
            sx={{
              color: "text.secondary",
              fontFamily: "var(--font-body)",
              fontSize: { xs: "1.25rem", md: "1.45rem" },
              fontWeight: 400,
              lineHeight: 1.45,
              maxWidth: 760,
            }}
          >
            {summary}
          </Typography>
        ) : null}
        {ctas.length > 0 ? <CTAGroup actions={ctas} /> : null}
        <Box
          sx={{
            display: "grid",
            gap: { xs: 1.5, sm: 3 },
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, auto)" },
            pt: 2,
          }}
        >
          {[
            ["software", "systems"],
            ["embedded", "integration"],
            ["robotics", "prototypes"],
            ["proof", "artifacts"],
          ].map(([value, label]) => (
            <Box key={value}>
              <Typography
                sx={{
                  color: "text.primary",
                  fontFamily: "var(--font-code)",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                {value}
              </Typography>
              <MonoLabel>{label}</MonoLabel>
            </Box>
          ))}
        </Box>
      </Stack>

      <Stack
        spacing={2.25}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "background.paper",
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0))",
          p: { xs: 2.5, md: 3 },
        }}
      >
        <MonoLabel sx={{ color: "primary.main" }}>Curated profile signal</MonoLabel>
        <Box>{children}</Box>
        {techTags.length > 0 ? (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {techTags.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}
