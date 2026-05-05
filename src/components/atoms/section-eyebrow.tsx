import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  id?: string;
  sx?: SxProps<Theme>;
};

export function SectionEyebrow({ children, id, sx }: SectionEyebrowProps) {
  return (
    <Typography
      id={id}
      component="p"
      variant="overline"
      sx={{
        color: "primary.main",
        display: "block",
        fontFamily: "var(--font-code), ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        mb: 1,
        textTransform: "uppercase",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
