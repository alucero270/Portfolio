import { Box, Stack, Typography } from "@mui/material";

import { BrandGlyph, type BrandGlyphName, MonoLabel } from "@/components/atoms";

export type SignalStripItem = {
  description: string;
  glyph?: BrandGlyphName;
  label: string;
};

type SignalStripSectionProps = {
  items: SignalStripItem[];
};

export function SignalStripSection({ items }: SignalStripSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      aria-label="Capability signals"
      sx={{
        borderBlock: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(15, 15, 23, 0.42)",
        mx: { xs: -2, sm: 0 },
        px: { xs: 2.5, sm: 0 },
        py: { xs: 3.5, md: 2.5 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 0,
          gridTemplateColumns: { xs: "1fr", md: `repeat(${items.length}, minmax(0, 1fr))` },
        }}
      >
        {items.map((item, index) => (
          <Stack
            key={item.label}
            spacing={0.75}
            sx={{
              borderBottom: {
                xs: index < items.length - 1 ? "1px solid" : "none",
                md: "none",
              },
              borderLeft: { md: index > 0 ? "1px solid" : "none" },
              borderColor: "divider",
              px: { xs: 0, md: 2.5 },
              py: { xs: 2.25, md: 0.5 },
            }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              {item.glyph ? (
                <BrandGlyph name={item.glyph} size={22} sx={{ color: "primary.main" }} />
              ) : null}
              <Typography component="h2" variant="h4">
                {item.label}
              </Typography>
            </Stack>
            <MonoLabel sx={{ color: "text.secondary" }}>{item.description}</MonoLabel>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
