import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  completeReminder,
} from "../api/reminderApi";

const ReminderContext = createContext();

export function ReminderProvider({ children }) {

  const [reminders, setReminders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadReminders = async () => {

    try {

      setLoading(true);

      const data = await getReminders();

      setReminders(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Unable to load reminders.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (localStorage.getItem("token")) {

      loadReminders();

    }

  }, []);

  const addReminder = async (reminder) => {

    await createReminder(reminder);

    await loadReminders();

  };

  const editReminder = async (id, reminder) => {

    await updateReminder(id, reminder);

    await loadReminders();

  };

  const removeReminder = async (id) => {

    await deleteReminder(id);

    await loadReminders();

  };

  const markCompleted = async (id) => {

    await completeReminder(id);

    await loadReminders();

  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        loading,
        error,
        loadReminders,
        addReminder,
        editReminder,
        removeReminder,
        markCompleted,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  return useContext(ReminderContext);
}