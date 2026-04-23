import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  component?: "h1" | "h2" | "h3";
  gutterBottom?: boolean;
  id?: string;
  sx?: SxProps<Theme>;
  variant?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  children,
  component = "h2",
  gutterBottom,
  id,
  sx,
  variant = "h2",
}: SectionHeadingProps) {
  return (
    <Typography id={id} component={component} variant={variant} gutterBottom={gutterBottom} sx={sx}>
      {children}
    </Typography>
  );
}
