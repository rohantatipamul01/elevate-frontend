import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function EventLegend() {
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
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Calendar Legend
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
        >
          <Chip
            icon={<AssignmentRoundedIcon />}
            label="Task"
            color="primary"
            variant="filled"
          />

          <Chip
            icon={<NotificationsRoundedIcon />}
            label="Reminder"
            color="success"
            variant="filled"
          />

          <Chip
            icon={<FlagRoundedIcon />}
            label="High Priority"
            color="error"
            variant="outlined"
          />

          <Chip
            icon={<CheckCircleRoundedIcon />}
            label="Completed"
            color="success"
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}