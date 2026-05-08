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
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Accent circle behind the arrow */}
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#8A7CFF"
          strokeWidth="2"
          fill="none"
          opacity="0.85"
        />

        {/* Speed / brush strokes trailing lower-left */}
        <line
          x1="18"
          y1="50"
          x2="26"
          y2="42"
          stroke="#8A7CFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="14"
          y1="46"
          x2="20"
          y2="40"
          stroke="#8A7CFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <line
          x1="20"
          y1="54"
          x2="24"
          y2="48"
          stroke="#8A7CFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Stylized arrow cursor pointing up-right */}
        <path d="M22 46 L22 18 L42 32 L32 32 L38 46 L30 40 L28 46 Z" fill="#FFFFFF" />
      </svg>
    </Box>
  );
}
