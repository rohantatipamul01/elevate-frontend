import {
  Box,
  Card,
  Stack,
  Typography,
} from "@mui/material";

import EventCard from "./EventCard";

export default function CalendarDayCell({
  day,
  currentMonth,
  events,
  isToday,
  onEventClick,
}) {
  const isCurrentMonth =
    day.getMonth() === currentMonth.getMonth();

 const dayEvents = events;
  return (
    <Card
      elevation={0}
      sx={{
        minHeight: 170,
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        bgcolor: isCurrentMonth
          ? "#FFFFFF"
          : "#F8FAFC",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderBottom: "1px solid #EEF2F7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: isToday
              ? "primary.main"
              : "transparent",
            color: isToday
              ? "#FFFFFF"
              : isCurrentMonth
              ? "text.primary"
              : "text.disabled",
          }}
        >
          {day.getDate()}
        </Typography>

        {dayEvents.length > 0 && (
          <Typography
            variant="caption"
            color="primary"
            fontWeight={600}
          >
            {dayEvents.length} Event
            {dayEvents.length > 1 ? "s" : ""}
          </Typography>
        )}
      </Box>

      <Stack
        spacing={1}
        sx={{
          p: 1,
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {dayEvents.length === 0 ? (
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{
              mt: 2,
            }}
          >
            No Events
          </Typography>
        ) : (
          dayEvents.map((event) => (
            <EventCard
              key={`${event.type}-${event.id}`}
              event={event}
              onClick={onEventClick}
            />
          ))
        )}
      </Stack>
    </Card>
  );
}