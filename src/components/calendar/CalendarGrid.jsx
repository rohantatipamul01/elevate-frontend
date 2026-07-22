import { useMemo, useState } from "react";

import {
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useCalendar } from "../../context/CalendarContext";

import CalendarDayCell from "./CalendarDayCell";
import EventDetailsDialog from "./EventDetailsDialog";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatLocalDate = (date) => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

export default function CalendarGrid({ currentDate }) {
  const {
    events,
    loading,
    error,
  } = useCalendar();

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const today = new Date();

  const groupedEvents = useMemo(() => {
    const grouped = {};

    events.forEach((event) => {

      let key = event.date;

      // Handles both
      // 2026-07-12
      // 2026-07-12T00:00:00

      if (key?.includes("T")) {
        key = key.split("T")[0];
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(event);
    });

    return grouped;
  }, [events]);

  const calendarDays = useMemo(() => {

    const month = currentDate.getMonth();

    const year = currentDate.getFullYear();

    const firstDay =
      new Date(year, month, 1);

    const firstWeekDay =
      firstDay.getDay();

    const startDate =
      new Date(year, month, 1 - firstWeekDay);

    const days = [];

    for (let i = 0; i < 42; i++) {

      const day = new Date(startDate);

      day.setDate(startDate.getDate() + i);

      days.push(day);

    }

    return days;

  }, [currentDate]);

  if (loading) {
    return (
      <Stack
        py={8}
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        mb={2}
      >
        {WEEK_DAYS.map((day) => (
          <Grid
            key={day}
            size={{
              xs: 12 / 7,
            }}
          >
            <Typography
              align="center"
              fontWeight={700}
            >
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
      >
        {calendarDays.map((day) => {

          const key =
            formatLocalDate(day);

          const dayEvents =
            groupedEvents[key] || [];

          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();

          return (
            <Grid
              key={key}
              size={{
                xs: 12,
                sm: 6,
                md: 12 / 7,
              }}
            >
              <CalendarDayCell
                day={day}
                currentMonth={currentDate}
                events={dayEvents}
                isToday={isToday}
                onEventClick={setSelectedEvent}
              />
            </Grid>
          );

        })}
      </Grid>

      <EventDetailsDialog
        open={Boolean(selectedEvent)}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}