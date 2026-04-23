import { createTheme } from "@mui/material/styles";

const brandTokens = {
  background: "#080A0F",
  surface: "#11151D",
  surfaceRaised: "#171C26",
  textPrimary: "#F6F7FB",
  textSecondary: "#A8B0BF",
  border: "rgba(166, 176, 195, 0.18)",
  violet: "#9B7CFF",
  violetDark: "#6F55D8",
  violetSoft: "rgba(155, 124, 255, 0.14)",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: brandTokens.violet,
      dark: brandTokens.violetDark,
      contrastText: "#080A0F",
    },
    secondary: {
      main: "#77E0C6",
      contrastText: "#080A0F",
    },
    background: {
      default: brandTokens.background,
      paper: brandTokens.surface,
    },
    text: {
      primary: brandTokens.textPrimary,
      secondary: brandTokens.textSecondary,
    },
    divider: brandTokens.border,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-body), 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      lineHeight: 1.3,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brandTokens.background,
          color: brandTokens.textPrimary,
        },
        "::selection": {
          backgroundColor: brandTokens.violetSoft,
          color: brandTokens.textPrimary,
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
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&.Mui-focusVisible": {
            boxShadow: `0 0 0 3px ${brandTokens.violetSoft}`,
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: brandTokens.border,
          "&:hover": {
            borderColor: brandTokens.violet,
            backgroundColor: brandTokens.violetSoft,
          },
        },
        text: {
          "&:hover": {
            backgroundColor: brandTokens.violetSoft,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: brandTokens.textPrimary,
          textUnderlineOffset: "0.18em",
          textDecorationThickness: "0.08em",
          "&:hover": {
            color: brandTokens.violet,
          },
          "&:focus-visible": {
            borderRadius: 4,
            outline: `2px solid ${brandTokens.violet}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderColor: brandTokens.border,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${brandTokens.border}`,
          backgroundColor: brandTokens.surface,
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderColor: brandTokens.border,
          backgroundColor: brandTokens.surfaceRaised,
          color: brandTokens.textSecondary,
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: brandTokens.violetSoft,
          color: brandTokens.textPrimary,
        },
        outlined: {
          borderColor: brandTokens.border,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: brandTokens.border,
        },
      },
    },
  },
});
