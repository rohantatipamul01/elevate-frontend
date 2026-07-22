import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import CalendarHeader from "../components/calendar/CalendarHeader";
import EventLegend from "../components/calendar/EventLegend";
import CalendarGrid from "../components/calendar/CalendarGrid";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const handlePreviousMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(
          previousDate.getFullYear(),
          previousDate.getMonth() - 1,
          1
        )
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(
          previousDate.getFullYear(),
          previousDate.getMonth() + 1,
          1
        )
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
      >
        Calendar
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
      >
        View your tasks and reminders in a monthly calendar
        to better plan your work and stay organized.
      </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid size={12}>
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />
        </Grid>

        <Grid size={12}>
          <EventLegend />
        </Grid>

        <Grid size={12}>
          <CalendarGrid
            currentDate={currentDate}
          />
        </Grid>
      </Grid>
    </Box>
  );
}