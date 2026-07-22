import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

export default function CalendarHeader({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) {
  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 4,
        mb: 3,
      }}
    >
      <CardContent>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "stretch",
            md: "center",
          }}
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <CalendarMonthRoundedIcon color="primary" />

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {monthLabel}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            justifyContent={{
              xs: "space-between",
              md: "flex-end",
            }}
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={onToday}
            >
              Today
            </Button>

            <IconButton
              onClick={onPreviousMonth}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            <IconButton
              onClick={onNextMonth}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}