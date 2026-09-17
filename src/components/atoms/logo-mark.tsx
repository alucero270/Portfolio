import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type LogoMarkProps = {
  size?: number;
  className?: string;
  sx?: SxProps<Theme>;
};

export function LogoMark({ size = 32, className, sx }: LogoMarkProps) {
  return (
    <Box
      className={className}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        ...sx,
      }}
    >
      <Box
        alt=""
        aria-hidden="true"
        component="img"
        src="/images/brand/mark-only.png"
        sx={{
          display: "block",
          height: size,
          objectFit: "contain",
          width: size,
        }}
      />
    </Box>
  );
}
