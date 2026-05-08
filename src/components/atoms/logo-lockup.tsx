import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { LogoMark } from "./logo-mark";

const sizeMap = {
  sm: { mark: 28, name: "0.92rem", labs: "0.52rem", tagline: "0.48rem", gap: 1 },
  md: { mark: 32, name: "1.05rem", labs: "0.58rem", tagline: "0.52rem", gap: 1.25 },
  lg: { mark: 48, name: "1.5rem", labs: "0.72rem", tagline: "0.6rem", gap: 1.5 },
} as const;

type LogoLockupProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
};

export function LogoLockup({ size = "md", showTagline = false, className, sx }: LogoLockupProps) {
  const t = sizeMap[size];

  return (
    <Box className={className} sx={{ display: "inline-flex", ...sx }}>
      <Stack direction="row" spacing={t.gap} sx={{ alignItems: "center" }}>
        <LogoMark size={t.mark} />

        <Stack spacing={0.25}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "baseline" }}>
            <Typography
              component="span"
              sx={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: t.name,
                letterSpacing: "0.08em",
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              Loose{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                A
              </Box>
              rrow
            </Typography>
            <Typography
              component="span"
              sx={{
                color: "#8A7CFF",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: t.labs,
                letterSpacing: "0.34em",
                lineHeight: 1.2,
                textTransform: "uppercase",
              }}
            >
              Labs
            </Typography>
          </Stack>

          {showTagline && (
            <Typography
              component="span"
              sx={{
                color: "text.secondary",
                fontFamily: "var(--font-code)",
                fontSize: t.tagline,
                fontWeight: 500,
                letterSpacing: "0.18em",
                lineHeight: 1.4,
                textTransform: "uppercase",
              }}
            >
              Build cool things.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
