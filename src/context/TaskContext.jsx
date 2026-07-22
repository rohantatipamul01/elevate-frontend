import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as taskApi from "../api/taskApi";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await taskApi.getAllTasks();

      setTasks(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    const newTask = await taskApi.createTask(task);

    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = async (id, task) => {
    const updated = await taskApi.updateTask(id, task);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  const deleteTask = async (id) => {
    await taskApi.deleteTask(id);

    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  const completeTask = async (id) => {
    const updated = await taskApi.completeTask(id);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadTasks();
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}