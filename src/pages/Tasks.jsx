import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

import TaskToolbar from "../components/task/TaskToolbar";
import TaskFilters from "../components/task/TaskFilters";
import TaskGrid from "../components/task/TaskGrid";
import CreateTaskDialog from "../components/task/CreateTaskDialog";
import DeleteTaskDialog from "../components/task/DeleteTaskDialog";

import { useTasks } from "../context/TaskContext";

export default function Tasks() {

  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  } = useTasks();

  const [search, setSearch] = useState("");

  const [priority, setPriority] = useState("");

  const [status, setStatus] = useState("");

  const [category, setCategory] = useState("");

  const [sortBy, setSortBy] = useState("date");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const filteredTasks = useMemo(() => {

    let filtered = [...tasks];

    if (search) {

      filtered = filtered.filter((task) =>
        task.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (priority) {

      filtered = filtered.filter(
        (task) => task.priority === priority
      );

    }

    if (status) {

      filtered = filtered.filter(
        (task) => task.status === status
      );

    }

    if (category) {

      filtered = filtered.filter(
        (task) => task.category === category
      );

    }

    switch (sortBy) {

      case "title":

        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        break;

      case "priority":

        filtered.sort((a, b) =>
          a.priority.localeCompare(b.priority)
        );

        break;

      default:

        filtered.sort(
          (a, b) =>
            new Date(a.dueDate) -
            new Date(b.dueDate)
        );

    }

    return filtered;

  }, [
    tasks,
    search,
    priority,
    status,
    category,
    sortBy,
  ]);

  const handleCreateTask = () => {

    setEditingTask(null);

    setDialogOpen(true);

  };

  const handleSaveTask = async (task) => {

    try {

      if (editingTask) {

        await updateTask(
          editingTask.id,
          task
        );

      } else {

        await createTask(task);

      }

      setDialogOpen(false);

      setEditingTask(null);

    } catch (err) {

      console.error(err);

    }

  };

  const handleEditTask = (task) => {

    setEditingTask(task);

    setDialogOpen(true);

  };

  const handleDeleteTask = (task) => {

    setSelectedTask(task);

    setDeleteDialogOpen(true);

  };

  const handleConfirmDelete = async () => {

    try {

      await deleteTask(selectedTask.id);

      setDeleteDialogOpen(false);

      setSelectedTask(null);

    } catch (err) {

      console.error(err);

    }

  };

  const handleToggleComplete = async (task) => {

    try {

      await completeTask(task.id);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <Box>

      <TaskToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateTask={handleCreateTask}
      />

      <TaskFilters
        priority={priority}
        status={status}
        category={category}
        sortBy={sortBy}
        onPriorityChange={setPriority}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
        onClear={() => {

          setSearch("");

          setPriority("");

          setStatus("");

          setCategory("");

          setSortBy("date");

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

        <TaskGrid
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />

      )}

      <CreateTaskDialog
        open={dialogOpen}
        onClose={() => {

          setDialogOpen(false);

          setEditingTask(null);

        }}
        onSave={handleSaveTask}
        initialData={editingTask}
      />

      <DeleteTaskDialog
        open={deleteDialogOpen}
        task={selectedTask}
        onClose={() => {

          setDeleteDialogOpen(false);

          setSelectedTask(null);

        }}
        onConfirm={handleConfirmDelete}
      />

    </Box>

  );

}