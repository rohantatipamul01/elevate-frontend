import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import { useHabits } from "../context/HabitContext";

import HabitToolbar from "../components/habit/HabitToolbar";
import HabitGrid from "../components/habit/HabitGrid";
import CreateHabitDialog from "../components/habit/CreateHabitDialog";
import DeleteHabitDialog from "../components/habit/DeleteHabitDialog";

export default function Habits() {

  const {
    habits,
    loading,
    error,
    addHabit,
    editHabit,
    removeHabit,
    markCompleted,
  } = useHabits();

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingHabit, setEditingHabit] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedHabit, setSelectedHabit] =
    useState(null);

  const filteredHabits = useMemo(() => {

    return habits.filter((habit) =>
      habit.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [habits, search]);

  const handleSaveHabit = async (habit) => {

    try {

      if (editingHabit) {

        await editHabit(
          editingHabit.id,
          habit
        );

      } else {

        await addHabit(habit);

      }

      setDialogOpen(false);

      setEditingHabit(null);

    } catch (error) {

      console.error(error);

    }

  };

  const handleDelete = async () => {

    try {

      await removeHabit(selectedHabit.id);

      setDeleteDialogOpen(false);

      setSelectedHabit(null);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Box>

      <HabitToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateHabit={() => {

          setEditingHabit(null);

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

        <HabitGrid
          habits={filteredHabits}
          onEdit={(habit) => {

            setEditingHabit(habit);

            setDialogOpen(true);

          }}
          onDelete={(habit) => {

            setSelectedHabit(habit);

            setDeleteDialogOpen(true);

          }}
          onComplete={(habit) => {

            markCompleted(habit.id);

          }}
        />

      )}

      <CreateHabitDialog
        open={dialogOpen}
        onClose={() => {

          setDialogOpen(false);

          setEditingHabit(null);

        }}
        onSave={handleSaveHabit}
        initialData={editingHabit}
      />

      <DeleteHabitDialog
        open={deleteDialogOpen}
        habit={selectedHabit}
        onClose={() => {

          setDeleteDialogOpen(false);

          setSelectedHabit(null);

        }}
        onConfirm={handleDelete}
      />

    </Box>

  );

}