import { Box, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type ServiceItem = {
  id?: string;
  title: string;
  description: string;
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
        <Stack spacing={0}>
          {renderedGroups.map((group, groupIndex) => (
            <Box
              key={group.id}
              component="section"
              aria-labelledby={`${group.id}-heading`}
              sx={{
                borderBottom: groupIndex < renderedGroups.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "0.86fr 1.7fr" },
              }}
            >
              <Stack
                spacing={1.5}
                sx={{
                  borderBottom: { xs: "1px solid", lg: "none" },
                  borderColor: "divider",
                  borderRight: { lg: "1px solid" },
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <MonoLabel sx={{ color: "primary.main" }}>{group.eyebrow}</MonoLabel>
                <SectionHeading
                  component="h3"
                  id={`${group.id}-heading`}
                  sx={{ fontSize: { xs: "1.45rem", md: "1.7rem" } }}
                >
                  {group.title}
                </SectionHeading>
                <Typography color="text.secondary" sx={{ fontSize: "0.94rem", lineHeight: 1.6 }}>
                  {group.description}
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                {group.items.map((item, itemIndex) => (
                  <Box
                    key={item.title}
                    id={item.id}
                    sx={{
                      borderBottom: {
                        xs: itemIndex < group.items.length - 1 ? "1px solid" : "none",
                        md:
                          itemIndex < group.items.length - (group.items.length % 2 || 2)
                            ? "1px solid"
                            : "none",
                      },
                      borderColor: "divider",
                      borderRight: {
                        xs: "none",
                        md:
                          (itemIndex + 1) % 2 !== 0 && itemIndex < group.items.length - 1
                            ? "1px solid"
                            : "none",
                      },
                      gridColumn: {
                        md:
                          itemIndex === group.items.length - 1 && group.items.length % 2 !== 0
                            ? "1 / -1"
                            : "auto",
                      },
                      minHeight: 150,
                      p: { xs: 2.5, md: 3 },
                    }}
                  >
                    <Typography
                      component="h4"
                      sx={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.06rem",
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}
