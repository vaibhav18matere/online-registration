"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      dark: "#2563eb",
      light: "#60a5fa",
    },
    background: {
      default: "#0a1628",
      paper: "#132238",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    divider: "rgba(59, 130, 246, 0.2)",
    success: { main: "#4ade80" },
    error: { main: "#f87171" },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export function AppThemeProvider({ children }) {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
}
