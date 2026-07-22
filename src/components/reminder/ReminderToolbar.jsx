import {
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function ReminderToolbar({
  search,
  onSearchChange,
  onCreateReminder,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 4,
        border: "1px solid #E2E8F0",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <TextField
          fullWidth
          placeholder="Search reminders..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <SearchRoundedIcon
                sx={{
                  mr: 1,
                  color: "text.secondary",
                }}
              />
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onCreateReminder}
        >
          Create Reminder
        </Button>
      </Stack>
    </Paper>
  );
}