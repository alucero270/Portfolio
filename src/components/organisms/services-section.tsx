import { Box, Card, Stack, Typography } from "@mui/material";

import { MonoLabel, SectionEyebrow, SectionHeading } from "@/components/atoms";

export type ServiceItem = {
  title: string;
  description: string;
};

type ServicesSectionProps = {
  headingId: string;
  items: ServiceItem[];
};

export function ServicesSection({ headingId, items }: ServicesSectionProps) {
  if (items.length === 0) {
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
          <MonoLabel>§06</MonoLabel>
          <Box aria-hidden sx={{ bgcolor: "divider", height: 1, width: 24 }} />
          <SectionEyebrow sx={{ mb: 0 }}>Services</SectionEyebrow>
        </Stack>
        <SectionHeading id={headingId}>What I take on</SectionHeading>
        <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
          Three focuses. Outcome-led. No agency menu.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 0,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {items.map((item, index) => (
          <Card
            key={item.title}
            sx={{
              borderRadius: 0,
              border: "none",
              borderRight: index < items.length - 1 ? "1px solid" : "none",
              borderColor: "divider",
              backgroundColor: "background.paper",
              backgroundImage: "none",
              p: 3.5,
              "&:hover": {
                backgroundColor: "background.paper",
                borderColor: "divider",
                transform: "none",
              },
            }}
          >
            <MonoLabel sx={{ color: "primary.main", display: "block", mb: 2 }}>
              {String(index + 1).padStart(2, "0")}
            </MonoLabel>
            <SectionHeading component="h3" sx={{ fontSize: "1.375rem", mb: 1.25 }}>
              {item.title}
            </SectionHeading>
            <Typography color="text.secondary" sx={{ fontSize: "0.9rem", lineHeight: 1.555 }}>
              {item.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
