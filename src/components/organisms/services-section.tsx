import { Box, Stack, Typography } from "@mui/material";

import {
  BrandGlyph,
  type BrandGlyphName,
  MonoLabel,
  SectionEyebrow,
  SectionHeading,
} from "@/components/atoms";

export type ServiceItem = {
  id?: string;
  title: string;
  description: string;
  detail?: string;
  glyph?: BrandGlyphName;
  image?: string;
  stack?: string[];
};

export type ServiceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

type ServicesSectionProps = {
  headingId: string;
  groups?: ServiceGroup[];
  items?: ServiceItem[];
};

export function ServicesSection({ headingId, groups, items }: ServicesSectionProps) {
  const renderedGroups =
    groups ??
    (items
      ? [
          {
            id: "core-capabilities",
            eyebrow: "01. Core Capabilities",
            title: "Primary engineering work",
            description: "The recurring capability areas behind Loose Arrow Labs project work.",
            items,
          },
        ]
      : []);

  if (renderedGroups.length === 0) {
    return null;
  }

  const renderCapabilityMatrix = (group: ServiceGroup) => (
    <Box
      sx={{
        alignItems: "start",
        display: "grid",
        gap: 1.25,
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        mt: 3,
        minWidth: 0,
      }}
    >
      {group.items.map((item, itemIndex) => (
        <Box
          key={item.title}
          id={item.id}
          className="capability-matrix-item"
          tabIndex={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            gridColumn: {
              md:
                itemIndex === group.items.length - 1 && group.items.length % 2 !== 0
                  ? "1 / -1"
                  : "auto",
            },
            minHeight: 176,
            minWidth: 0,
            outline: "none",
            p: { xs: 1.75, sm: 2.25 },
            position: "relative",
            "&:focus-visible .capability-popout, &:hover .capability-popout": {
              maxHeight: "36rem",
              mt: 1.25,
              opacity: 1,
              py: 2.25,
              transform: "translateY(0)",
            },
            "&:focus-visible .capability-summary, &:hover .capability-summary": {
              maxHeight: 0,
              opacity: 0,
              overflow: "hidden",
            },
          }}
        >
          {item.image ? (
            <Box
              aria-hidden="true"
              sx={{
                backgroundImage: `linear-gradient(180deg, rgba(18, 18, 28, 0.08), rgba(18, 18, 28, 0.92)), url(${item.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                height: "auto",
                minHeight: { xs: 132, sm: 156, md: 92 },
                mb: 1.5,
                aspectRatio: { xs: "16 / 7", sm: "16 / 6", md: "16 / 5" },
              }}
            />
          ) : null}
          <Stack
            direction="row"
            sx={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 1.25,
              mb: 1,
              minWidth: 0,
            }}
          >
            <Typography
              component="h4"
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                fontWeight: 600,
                minWidth: 0,
                overflowWrap: "anywhere",
              }}
            >
              {item.title}
            </Typography>
            {item.glyph ? (
              <BrandGlyph name={item.glyph} size={18} sx={{ color: "primary.main", mt: 0.25 }} />
            ) : null}
          </Stack>
          <Typography
            className="capability-summary"
            color="text.secondary"
            sx={{
              fontSize: "0.88rem",
              lineHeight: 1.58,
              maxHeight: "8rem",
              overflowWrap: "anywhere",
              transition: "max-height 160ms ease, opacity 160ms ease",
            }}
          >
            {item.description}
          </Typography>

          <Box
            className="capability-popout"
            sx={{
              backgroundColor: "rgba(18, 18, 28, 0.98)",
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 1,
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.5)",
              maxHeight: 0,
              opacity: 0,
              overflow: "hidden",
              px: 2.25,
              py: 0,
              pointerEvents: "none",
              transform: "translateY(8px)",
              transition:
                "max-height 220ms ease, margin-top 160ms ease, opacity 160ms ease, transform 160ms ease",
            }}
          >
            <SectionEyebrow sx={{ mb: 0.75 }}>Details</SectionEyebrow>
            <Typography
              color="text.secondary"
              sx={{ fontSize: "0.88rem", lineHeight: 1.58, mb: 1.5 }}
            >
              {item.detail ?? item.description}
            </Typography>
            {item.stack && item.stack.length > 0 ? (
              <Stack spacing={1}>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontFamily: "var(--font-code)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Tech stack
                </Typography>
                <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                  {item.stack.map((tool) => (
                    <Typography
                      key={tool}
                      component="span"
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        color: "text.secondary",
                        fontFamily: "var(--font-code)",
                        fontSize: "0.68rem",
                        px: 0.85,
                        py: 0.45,
                      }}
                    >
                      {tool}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            ) : null}
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        component="header"
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
          <MonoLabel>S06</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Capabilities</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Engineering capabilities</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mx: { xs: "auto", md: 0 }, mt: 1 }}>
          Practical R&D and integration support across embedded systems, AI infrastructure,
          technical software, hardware-aware prototyping, and systems operations.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {renderedGroups.map((group) => (
          <Box key={group.id} sx={{ minWidth: 0 }}>
            <SectionEyebrow>{group.eyebrow}</SectionEyebrow>
            <Typography color="text.secondary" sx={{ maxWidth: 700, mt: 1 }}>
              {group.description}
            </Typography>
            {renderCapabilityMatrix(group)}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
