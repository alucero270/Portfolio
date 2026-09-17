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
        left: "50%",
        maxWidth: "100vw",
        px: { xs: 2.25, md: 4 },
        position: "relative",
        py: { xs: 3.5, md: 2.5 },
        transform: "translateX(-50%)",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 0,
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            lg: `repeat(${items.length}, minmax(0, 1fr))`,
          },
          maxWidth: 1240,
          mx: "auto",
        }}
      >
        {items.map((item, index) => (
          <Stack
            key={item.label}
            spacing={0.75}
            sx={{
              borderBottom: {
                xs: index < 2 ? "1px solid" : "none",
                lg: "none",
              },
              borderLeft: {
                xs: index % 2 === 1 ? "1px solid" : "none",
                lg: index > 0 ? "1px solid" : "none",
              },
              borderColor: "divider",
              minWidth: 0,
              px: { xs: 1.5, md: 2.5 },
              py: { xs: 2.25, md: 0.5 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Stack
              direction="row"
              spacing={1.25}
              sx={{ alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}
            >
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
