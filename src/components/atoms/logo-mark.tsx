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
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M72 13.5A51 51 0 0 0 25.4 91.3"
          stroke="#8A7CFF"
          strokeWidth="7"
          strokeLinecap="butt"
        />
        <path
          d="M102.4 46.7a51.1 51.1 0 0 1-9.6 55.1 51 51 0 0 1-43.5 13.7"
          stroke="#8A7CFF"
          strokeWidth="7"
          strokeLinecap="butt"
        />
        <path
          d="M24 72 101 32 70 108 58 77 23 104"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M24 72 57 77"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M11 116 33 94"
          stroke="#8A7CFF"
          strokeWidth="3"
          strokeLinecap="square"
          opacity="0.58"
        />
        <path
          d="M16 105 30 91"
          stroke="#8A7CFF"
          strokeWidth="2.5"
          strokeLinecap="square"
          opacity="0.42"
        />
        <path
          d="M7 108 23 92"
          stroke="#8A7CFF"
          strokeWidth="2"
          strokeLinecap="square"
          opacity="0.28"
        />
      </svg>
    </Box>
  );
}
