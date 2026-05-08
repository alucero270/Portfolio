import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const glyphPaths = {
  bolt: "/images/glyphs/glyph-bolt.svg",
  chip: "/images/glyphs/glyph-chip.svg",
  code: "/images/glyphs/glyph-code.svg",
  robot: "/images/glyphs/glyph-robot.svg",
} as const;

export type BrandGlyphName = keyof typeof glyphPaths;

type BrandGlyphProps = {
  name: BrandGlyphName;
  size?: number;
  sx?: SxProps<Theme>;
};

export function BrandGlyph({ name, size = 24, sx }: BrandGlyphProps) {
  return (
    <Box
      aria-hidden="true"
      component="span"
      sx={{
        bgcolor: "currentColor",
        display: "inline-block",
        height: size,
        mask: `url(${glyphPaths[name]}) center / contain no-repeat`,
        WebkitMask: `url(${glyphPaths[name]}) center / contain no-repeat`,
        width: size,
        ...sx,
      }}
    />
  );
}
