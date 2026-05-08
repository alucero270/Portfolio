import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import {
  BrandGlyph,
  LogoLockup,
  SectionEyebrow,
  SectionHeading,
  TechTag,
} from "@/components/atoms";
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
      </Stack>

      <Stack
        spacing={2.5}
        sx={{
          alignSelf: "stretch",
          borderLeft: { md: "1px solid" },
          borderColor: "divider",
          justifyContent: "center",
          pl: { md: 4 },
        }}
      >
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            alt=""
            aria-hidden="true"
            component="img"
            src="/images/ChatGPT%20Image%20Apr%2023%2C%202026%2C%2001_55_26%20AM.png"
            sx={{
              aspectRatio: "1 / 1",
              display: "block",
              height: "auto",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: "center",
            color: "text.secondary",
            justifyContent: "center",
          }}
        >
          <BrandGlyph name="code" />
          <Box
            aria-hidden
            sx={{ bgcolor: "primary.main", borderRadius: "50%", height: 5, width: 5 }}
          />
          <BrandGlyph name="chip" />
          <Box
            aria-hidden
            sx={{ bgcolor: "primary.main", borderRadius: "50%", height: 5, width: 5 }}
          />
          <BrandGlyph name="robot" />
          <Box
            aria-hidden
            sx={{ bgcolor: "primary.main", borderRadius: "50%", height: 5, width: 5 }}
          />
          <BrandGlyph name="bolt" />
        </Stack>

        <Stack
          spacing={2}
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2.5,
          }}
        >
          <LogoLockup size="md" showTagline />
          <Box>{children}</Box>
        </Stack>

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
