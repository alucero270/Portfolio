import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { BrandGlyph, SectionEyebrow, SectionHeading, TechTag } from "@/components/atoms";
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
  stats?: { label: string; value: string }[];
  summary?: string;
  techTags?: string[];
  title: ReactNode;
};

export function AuthorityHero({
  ctas = [],
  eyebrow,
  headingId,
  stats = [],
  summary,
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
        justifyItems: { xs: "center", md: "stretch" },
        minHeight: { md: 560 },
        overflow: "hidden",
        py: { xs: 3, md: 6 },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Stack spacing={2.75} sx={{ alignItems: { xs: "center", md: "flex-start" }, minWidth: 0 }}>
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        <SectionHeading
          id={headingId}
          component="h1"
          variant="h1"
          sx={{ maxWidth: 860, overflowWrap: "anywhere" }}
        >
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
        {ctas.length > 0 ? (
          <Box
            sx={{ "& > .MuiStack-root": { justifyContent: { xs: "center", md: "flex-start" } } }}
          >
            <CTAGroup actions={ctas} />
          </Box>
        ) : null}
        {stats.length > 0 ? (
          <Stack
            direction="row"
            spacing={3.5}
            useFlexGap
            flexWrap="wrap"
            sx={{ justifyContent: { xs: "center", md: "flex-start" }, pt: 1.5, width: "100%" }}
          >
            {stats.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-code)",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: "var(--font-code)",
                    fontSize: "0.68rem",
                    mt: 0.25,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : null}
      </Stack>

      <Stack
        spacing={2.5}
        sx={{
          alignSelf: "stretch",
          borderLeft: { md: "1px solid" },
          borderColor: "divider",
          justifyContent: "center",
          maxWidth: "100%",
          minWidth: 0,
          pl: { md: 4 },
          width: "100%",
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
            src="/images/placeholders/circuit-board-dark.jpg"
            sx={{
              aspectRatio: "16 / 9",
              display: "block",
              height: "auto",
              objectFit: "cover",
              opacity: 0.68,
              width: "100%",
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              background: "linear-gradient(180deg, rgba(26, 26, 31, 0.04), rgba(26, 26, 31, 0.84))",
              inset: 0,
              position: "absolute",
            }}
          />
          <Stack
            direction="row"
            sx={{
              alignItems: "flex-end",
              bottom: 0,
              gap: 1.5,
              justifyContent: "space-between",
              left: 0,
              p: 2,
              position: "absolute",
              right: 0,
            }}
          >
            <Box>
              <SectionEyebrow sx={{ color: "#fff", mb: 0.75 }}>
                Loose Arrow Labs / Studio
              </SectionEyebrow>
              <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                Build cool things.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.2} sx={{ color: "rgba(255,255,255,0.72)" }}>
              <BrandGlyph name="code" size={18} />
              <BrandGlyph name="chip" size={18} />
              <BrandGlyph name="robot" size={18} />
              <BrandGlyph name="bolt" size={18} />
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={1.25}>
          <SectionEyebrow sx={{ mb: 0 }}>
            <Box
              aria-hidden
              component="span"
              sx={{
                backgroundColor: "#7BD88F",
                borderRadius: "50%",
                boxShadow: "0 0 0 3px rgba(123,216,143,0.18)",
                display: "inline-block",
                height: 6,
                mr: 1,
                verticalAlign: "middle",
                width: 6,
              }}
            />
            Active systems
          </SectionEyebrow>
          {[
            ["KittyBot", "Robotics runtime", "Phase 1"],
            ["VTCN", "Embedded telemetry", "Platform foundation"],
            ["OM606", "Signal integration", "Iterative refinement"],
          ].map(([name, type, status]) => (
            <Box
              key={name}
              sx={{
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                p: 1.75,
              }}
            >
              <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}
              >
                <Typography
                  component="h3"
                  sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {name}
                </Typography>
                <Box sx={{ flexShrink: 0, minWidth: 0 }}>
                  <TechTag label={status} />
                </Box>
              </Stack>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontFamily: "var(--font-code)",
                  fontSize: "0.68rem",
                  mt: 0.75,
                }}
              >
                {type}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
