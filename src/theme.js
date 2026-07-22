import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

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
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Helvetica",
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
      fontWeight: 600,
    },

    subtitle1: {
      fontWeight: 600,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      fontSize: "0.875rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: "#F5F7FB",
        },

        "*": {
          boxSizing: "border-box",
        },

        "::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },

        "::-webkit-scrollbar-thumb": {
          background: "#CBD5E1",
          borderRadius: 8,
        },

        "::-webkit-scrollbar-track": {
          background: "#F1F5F9",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingLeft: 18,
          paddingRight: 18,
          fontWeight: 600,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          color: "#1E293B",
          boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E2E8F0",
          background: "#FFFFFF",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginBottom: 6,

          "&.Mui-selected": {
            backgroundColor: "#EEF2FF",
            color: "#4F46E5",

            "& .MuiListItemIcon-root": {
              color: "#4F46E5",
            },
          },
        },
      },
    },
  },
});

export default theme;