import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAlt";

export default function TaskFilters({
  priority,
  status,
  category,
  sortBy,
  onPriorityChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <FilterAltRoundedIcon color="primary" />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Priority</InputLabel>

          <Select
            value={priority}
            label="Priority"
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="TODO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel>Category</InputLabel>

          <Select
            value={category}
            label="Category"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>

          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="date">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="inherit"
          startIcon={<RestartAltRoundedIcon />}
          onClick={onClear}
        >
          Clear Filters
        </Button>
      </Stack>
    </Box>
  );
}