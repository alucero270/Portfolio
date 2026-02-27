import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#005A9C",
    },
    secondary: {
      main: "#A03A2A",
    },
    background: {
      default: "#F6F8FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#16202B",
      secondary: "#304153",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "var(--font-body), 'Segoe UI', sans-serif",
    h1: {
      fontFamily: "var(--font-heading), Georgia, serif",
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: "var(--font-heading), Georgia, serif",
      fontWeight: 700,
      fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "var(--font-heading), Georgia, serif",
      fontWeight: 700,
      fontSize: "clamp(1.4rem, 2.4vw, 1.8rem)",
      lineHeight: 1.3,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textUnderlineOffset: "0.18em",
          textDecorationThickness: "0.08em",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #D6DEE8",
          boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08)",
        },
      },
    },
  },
});
