import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function TaskToolbar({
  search,
  onSearchChange,
  onCreateTask,
}) {
  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Tasks
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Organize your work and stay productive.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <TextField
            size="small"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
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
            sx={{
              minWidth: 260,
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onCreateTask}
            sx={{
              px: 3,
            }}
          >
            New Task
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}