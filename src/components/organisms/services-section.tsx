import { Box, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type ServiceItem = {
  id?: string;
  title: string;
  description: string;
  detail?: string;
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

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ py: { xs: 2, md: 3 } }}>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          mb: 3,
          pb: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <MonoLabel>S06</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Capabilities</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>Engineering capabilities</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
          Practical R&D and integration support across embedded systems, AI infrastructure,
          technical software, hardware-aware prototyping, and systems operations.
        </Typography>
      </Box>

      <Card sx={{ overflow: "hidden" }}>
        {renderedGroups.map((group, index) => (
          <Box
            key={group.id}
            id={`${group.id}-input`}
            className="capability-radio"
            component="input"
            type="radio"
            name={`${headingId}-capability-group`}
            defaultChecked={index === 0}
            sx={{ position: "absolute" }}
          />
        ))}

        <Box
          className="capability-explorer-card"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.82fr 1.8fr" },
          }}
        >
          <Stack
            component="aside"
            spacing={1.2}
            sx={{
              borderBottom: { xs: "1px solid", lg: "none" },
              borderColor: "divider",
              borderRight: { lg: "1px solid" },
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            {renderedGroups.map((group) => (
              <Box
                key={group.id}
                className={`capability-option capability-option-${group.id}`}
                component="label"
                htmlFor={`${group.id}-input`}
                sx={{
                  borderRadius: 1,
                  cursor: "pointer",
                  display: "grid",
                  gap: 0.45,
                  px: 1.25,
                  py: 1.1,
                  transition: "background-color 160ms ease, color 160ms ease",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "inherit",
                    fontFamily: "var(--font-display)",
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    fontWeight: 700,
                  }}
                >
                  {group.title}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "var(--font-code)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {group.eyebrow}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box sx={{ minHeight: { lg: 520 }, p: { xs: 2.5, md: 3.5 } }}>
            {renderedGroups.map((group) => (
              <Box
                key={group.id}
                className={`capability-panel capability-panel-${group.id}`}
                sx={{ display: "none" }}
              >
                <SectionEyebrow>{group.eyebrow}</SectionEyebrow>
                <SectionHeading
                  component="h3"
                  id={`${group.id}-heading`}
                  sx={{ fontSize: { xs: "1.55rem", md: "1.9rem" }, mt: 1 }}
                >
                  {group.title}
                </SectionHeading>
                <Typography color="text.secondary" sx={{ maxWidth: 700, mt: 1.2 }}>
                  {group.description}
                </Typography>

                <Box
                  sx={{
                    alignItems: "start",
                    display: "grid",
                    gap: 1.25,
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                    mt: 3,
                  }}
                >
                  {group.items.map((item) => (
                    <Box
                      key={item.title}
                      id={item.id}
                      className="capability-matrix-item"
                      tabIndex={0}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        minHeight: 176,
                        outline: "none",
                        p: 2.25,
                        "&:focus-visible .capability-popout, &:hover .capability-popout": {
                          maxHeight: "36rem",
                          mt: 1.25,
                          opacity: 1,
                          pointerEvents: "auto",
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
                      <Typography
                        component="h4"
                        sx={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        className="capability-summary"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.88rem",
                          lineHeight: 1.58,
                          maxHeight: "8rem",
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
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
