import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#4F46E5",
      },

      secondary: {
        main: "#7C3AED",
      },

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },

      background: {
        default:
          mode === "light"
            ? "#F5F7FB"
            : "#0F172A",

        paper:
          mode === "light"
            ? "#FFFFFF"
            : "#1E293B",
      },

      text: {
        primary:
          mode === "light"
            ? "#111827"
            : "#F8FAFC",

        secondary:
          mode === "light"
            ? "#6B7280"
            : "#CBD5E1",
      },

      divider:
        mode === "light"
          ? "#E2E8F0"
          : "#334155",
    },

    shape: {
      borderRadius: 16,
    },

    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Arial",
        "sans-serif",
      ].join(","),

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 700,
      },

      h6: {
        fontWeight: 700,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition:
              "background-color 0.25s ease, color 0.25s ease",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });