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
        fontWeight: 700,
        letterSpacing: 0,
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
