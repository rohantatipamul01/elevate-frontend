import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";

import { useReminders } from "../context/ReminderContext";

import ReminderToolbar from "../components/reminder/ReminderToolbar";
import ReminderGrid from "../components/reminder/ReminderGrid";
import CreateReminderDialog from "../components/reminder/CreateReminderDialog";
import DeleteReminderDialog from "../components/reminder/DeleteReminderDialog";
import EmptyReminder from "../components/reminder/EmptyReminder";

export default function Reminders() {
  const {
    reminders,
    loading,
    error,
    addReminder,
    editReminder,
    removeReminder,
    markCompleted,
  } = useReminders();

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingReminder, setEditingReminder] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedReminder, setSelectedReminder] =
    useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const filteredReminders = useMemo(() => {
    return reminders.filter((reminder) =>
      reminder.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [reminders, search]);

  const showSnackbar = (
    severity,
    message
  ) => {
    setSnackbar({
      open: true,
      severity,
      message,
    });
  };

  const handleSaveReminder = async (
    reminder
  ) => {
    let result;

    if (editingReminder) {
      result = await editReminder(
        editingReminder.id,
        reminder
      );
    } else {
      result = await addReminder(reminder);
    }

    showSnackbar(
      result.success ? "success" : "error",
      result.message
    );

    if (result.success) {
      setDialogOpen(false);
      setEditingReminder(null);
    }
  };

  const handleDelete = async () => {
    const result = await removeReminder(
      selectedReminder.id
    );

    showSnackbar(
      result.success ? "success" : "error",
      result.message
    );

    if (result.success) {
      setDeleteDialogOpen(false);
      setSelectedReminder(null);
    }
  };

  const handleComplete = async (
    reminder
  ) => {
    const result = await markCompleted(
      reminder.id
    );

    showSnackbar(
      result.success ? "success" : "error",
      result.message
    );
  };

  return (
    <Box>
      <ReminderToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateReminder={() => {
          setEditingReminder(null);
          setDialogOpen(true);
        }}
      />

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          py={8}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        filteredReminders.length === 0 && (
          <EmptyReminder />
        )}

      {!loading &&
        !error &&
        filteredReminders.length > 0 && (
          <ReminderGrid
            reminders={filteredReminders}
            onEdit={(reminder) => {
              setEditingReminder(
                reminder
              );
              setDialogOpen(true);
            }}
            onDelete={(reminder) => {
              setSelectedReminder(
                reminder
              );
              setDeleteDialogOpen(
                true
              );
            }}
            onComplete={
              handleComplete
            }
          />
        )}

      <CreateReminderDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingReminder(null);
        }}
        onSave={handleSaveReminder}
        initialData={editingReminder}
      />

      <DeleteReminderDialog
        open={deleteDialogOpen}
        reminder={selectedReminder}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedReminder(null);
        }}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={
            snackbar.severity
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}