import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import App from "./App";
import { getTheme } from "./theme/theme";

import {
  ColorModeProvider,
  useColorMode,
} from "./context/ColorModeContext";

import { SnackbarProvider } from "./context/SnackbarContext";

import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { TaskProvider } from "./context/TaskContext";
import { HabitProvider } from "./context/HabitContext";
import { ReminderProvider } from "./context/ReminderContext";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { CalendarProvider } from "./context/CalendarContext";
import { ProfileProvider } from "./context/ProfileContext"; // <-- IMPORTANT

function AppProviders() {

  const { mode } = useColorMode();

  const theme = useMemo(
    () => getTheme(mode),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SnackbarProvider>

        <AuthProvider>

          <DashboardProvider>

            <TaskProvider>

              <HabitProvider>

                <ReminderProvider>

                  <AnalyticsProvider>

                    <CalendarProvider>

                      <ProfileProvider>

                        <BrowserRouter>

                          <App />

                        </BrowserRouter>

                      </ProfileProvider>

                    </CalendarProvider>

                  </AnalyticsProvider>

                </ReminderProvider>

              </HabitProvider>

            </TaskProvider>

          </DashboardProvider>

        </AuthProvider>

      </SnackbarProvider>

    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ColorModeProvider>

      <AppProviders />

    </ColorModeProvider>

  </React.StrictMode>

);