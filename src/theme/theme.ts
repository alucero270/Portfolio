import { createTheme } from "@mui/material/styles";

// Design system tokens from Loose Arrow Labs
const brandTokens = {
  // Surfaces
  background: "#080a0f",
  surface0: "#080a0f",
  surface1: "#1a1a1f",
  surface1Hover: "#1f1f25",
  surface2: "#2b2b33",
  surface3: "#353540",

  // Foreground
  fgPrimary: "#f6f7fb",
  fgSecondary: "#a5a7ae",
  fgTertiary: "rgba(246, 247, 251, 0.55)",

  // Borders
  border1: "rgba(246, 247, 251, 0.08)",
  border2: "rgba(246, 247, 251, 0.14)",
  borderStrong: "rgba(246, 247, 251, 0.22)",

  // Accent (brand violet)
  accent: "#8a7cff",
  accentHover: "#9c8fff",
  accentPress: "#7768e6",
  accentMuted: "rgba(138, 124, 255, 0.16)",
  accentRing: "rgba(138, 124, 255, 0.32)",

  // Semantic
  live: "#7bd88f",
  liveMuted: "rgba(123, 216, 143, 0.18)",
  warn: "#f5b663",
  error: "#ff7b7b",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: brandTokens.accent,
      dark: brandTokens.accentPress,
      light: brandTokens.accentHover,
      contrastText: "#ffffff",
    },
    secondary: {
      main: brandTokens.live,
      contrastText: "#ffffff",
    },
    background: {
      default: brandTokens.surface0,
      paper: brandTokens.surface1,
    },
    text: {
      primary: brandTokens.fgPrimary,
      secondary: brandTokens.fgSecondary,
      disabled: brandTokens.fgTertiary,
    },
    divider: brandTokens.border1,
    action: {
      hover: brandTokens.surface1Hover,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-body)",
    h1: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.067,
      letterSpacing: "-0.02em",
      "@media (max-width:900px)": {
        fontSize: "2.25rem",
        lineHeight: 1.2,
      },
    },
    h2: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.222,
      letterSpacing: "-0.01em",
      "@media (max-width:900px)": {
        fontSize: "1.5rem",
        lineHeight: 1.333,
      },
    },
    h3: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      letterSpacing: "-0.005em",
    },
    h4: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.444,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.625,
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.429,
      fontWeight: 400,
    },
    caption: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      lineHeight: 1.333,
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brandTokens.surface0,
          color: brandTokens.fgPrimary,
        },
        "::selection": {
          backgroundColor: brandTokens.accentMuted,
          color: brandTokens.fgPrimary,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&.Mui-focusVisible": {
            boxShadow: `0 0 0 3px ${brandTokens.accentRing}`,
          },
        },
        contained: {
          backgroundColor: brandTokens.accent,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: brandTokens.accentHover,
            boxShadow: "0 8px 24px -10px rgba(138, 124, 255, 0.6)",
          },
          "&:active": {
            backgroundColor: brandTokens.accentPress,
          },
        },
        outlined: {
          borderColor: brandTokens.border2,
          color: brandTokens.fgPrimary,
          "&:hover": {
            borderColor: brandTokens.accent,
            backgroundColor: brandTokens.accentMuted,
          },
        },
        text: {
          color: brandTokens.fgPrimary,
          "&:hover": {
            backgroundColor: brandTokens.surface1,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: brandTokens.fgPrimary,
          textUnderlineOffset: "0.18em",
          textDecorationThickness: "0.08em",
          textDecorationColor: brandTokens.border2,
          transition: "text-decoration-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), color 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          "&:hover": {
            color: brandTokens.accent,
            textDecorationColor: brandTokens.accent,
          },
          "&:focus-visible": {
            borderRadius: 4,
            outline: "none",
            boxShadow: `0 0 0 2px ${brandTokens.surface0}, 0 0 0 4px ${brandTokens.accent}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: brandTokens.surface1,
          borderColor: brandTokens.border1,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${brandTokens.border1}`,
          backgroundColor: brandTokens.surface2,
          backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.015), transparent)",
          boxShadow: "none",
          transition: "border-color 180ms cubic-bezier(0.2, 0.8, 0.2, 1), background 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          "&:hover": {
            backgroundColor: brandTokens.surface2,
            borderColor: brandTokens.border2,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          "&:last-child": {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: brandTokens.border1,
          backgroundColor: "transparent",
          color: brandTokens.fgSecondary,
          fontFamily: "var(--font-code), ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "0.75rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        },
        colorPrimary: {
          backgroundColor: brandTokens.accentMuted,
          color: brandTokens.accent,
          borderColor: `rgba(138, 124, 255, 0.25)`,
        },
        outlined: {
          borderColor: brandTokens.border1,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: brandTokens.border1,
        },
      },
    },
  },
});
