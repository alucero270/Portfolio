import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type MonoLabelProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function MonoLabel({ children, sx }: MonoLabelProps) {
  return (
    <Typography
      component="span"
      variant="caption"
      sx={{
        color: "text.secondary",
        fontFamily: "var(--font-code), ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.04em",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
