import { createTheme } from "@mui/material/styles";

const brandTokens = {
  background: "#080A0F",
  surface: "#11151D",
  surfaceRaised: "#171C26",
  surfaceHover: "#1D2430",
  textPrimary: "#F6F7FB",
  textSecondary: "#A8B0BF",
  textTertiary: "rgba(246, 247, 251, 0.56)",
  border: "rgba(166, 176, 195, 0.18)",
  borderStrong: "rgba(166, 176, 195, 0.28)",
  violet: "#9B7CFF",
  violetDark: "#6F55D8",
  violetSoft: "rgba(155, 124, 255, 0.14)",
  live: "#7BD88F",
  liveSoft: "rgba(123, 216, 143, 0.16)",
  curated: "#D4A040",
  curatedSoft: "rgba(212, 160, 64, 0.13)",
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
      fontSize: "2.35rem",
      lineHeight: 1.04,
      "@media (min-width:900px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "1.8rem",
      lineHeight: 1.2,
      "@media (min-width:900px)": {
        fontSize: "2.25rem",
      },
    },
    h3: {
      fontFamily: "var(--font-heading), 'Segoe UI', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "1.35rem",
      lineHeight: 1.3,
      "@media (min-width:900px)": {
        fontSize: "1.65rem",
      },
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
          backgroundColor: brandTokens.violet,
          color: "#080A0F",
          "&:hover": {
            backgroundColor: "#AB94FF",
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
          backgroundImage:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0))",
          boxShadow: "none",
          transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
          "&:hover": {
            backgroundColor: brandTokens.surfaceHover,
            borderColor: brandTokens.borderStrong,
            transform: "translateY(-1px)",
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
          borderRadius: 8,
          borderColor: brandTokens.border,
          backgroundColor: brandTokens.surfaceRaised,
          color: brandTokens.textSecondary,
          fontFamily: "var(--font-code), ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "0.72rem",
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
