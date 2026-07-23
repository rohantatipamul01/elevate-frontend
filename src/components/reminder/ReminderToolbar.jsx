import {
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

export default function ReminderToolbar({
  search,
  onSearchChange,
  onCreateReminder,
  priority = "ALL",
  onPriorityChange,
}) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 3,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        {/* Header */}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Typography variant="h5" fontWeight={700}>
            Reminders
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onCreateReminder}
            sx={{
              borderRadius: 3,
              px: 3,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Create Reminder
          </Button>
        </Stack>

        {/* Controls */}

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
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
                <InputAdornment position="start">
                  <SearchRoundedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl
            sx={{
              minWidth: {
                xs: "100%",
                md: 180,
              },
            }}
          >
            <Select
              value={priority}
              onChange={(e) =>
                onPriorityChange?.(e.target.value)
              }
              startAdornment={
                <InputAdornment position="start">
                  <FilterListRoundedIcon
                    fontSize="small"
                  />
                </InputAdornment>
              }
            >
              <MenuItem value="ALL">
                All Priorities
              </MenuItem>

              <MenuItem value="HIGH">
                High
              </MenuItem>

              <MenuItem value="MEDIUM">
                Medium
              </MenuItem>

              <MenuItem value="LOW">
                Low
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  );
}