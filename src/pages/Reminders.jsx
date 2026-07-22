import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import { useReminders } from "../context/ReminderContext";

import ReminderToolbar from "../components/reminder/ReminderToolbar";
import ReminderGrid from "../components/reminder/ReminderGrid";
import CreateReminderDialog from "../components/reminder/CreateReminderDialog";
import DeleteReminderDialog from "../components/reminder/DeleteReminderDialog";

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

  const filteredReminders = useMemo(() => {

    return reminders.filter((reminder) =>
      reminder.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [reminders, search]);

  const handleSaveReminder = async (reminder) => {

    try {

      if (editingReminder) {

        await editReminder(
          editingReminder.id,
          reminder
        );

      } else {

        await addReminder(reminder);

      }

      setDialogOpen(false);

      setEditingReminder(null);

    } catch (err) {

      console.error(err);

    }

  };

  const handleDelete = async () => {

    try {

      await removeReminder(selectedReminder.id);

      setDeleteDialogOpen(false);

      setSelectedReminder(null);

    } catch (err) {

      console.error(err);

    }

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
          py={5}
        >
          <CircularProgress />
        </Box>

      )}

      {error && (

        <Alert severity="error">

          {error}

        </Alert>

      )}

      {!loading && !error && (

        <ReminderGrid
          reminders={filteredReminders}
          onEdit={(reminder) => {

            setEditingReminder(reminder);

            setDialogOpen(true);

          }}
          onDelete={(reminder) => {

            setSelectedReminder(reminder);

            setDeleteDialogOpen(true);

          }}
          onComplete={(reminder) => {

            markCompleted(reminder.id);

          }}
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

    </Box>

  );

}