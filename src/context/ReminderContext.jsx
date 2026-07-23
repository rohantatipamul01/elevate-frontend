import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
      setError("");

      const data = await getReminders();
      setReminders(data || []);
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
    try {
      setLoading(true);

      const created = await createReminder(reminder);

      if (created) {
        setReminders((prev) => [created, ...prev]);
      } else {
        await loadReminders();
      }

      return {
        success: true,
        message: "Reminder created successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to create reminder.",
      };
    } finally {
      setLoading(false);
    }
  };

  const editReminder = async (id, reminder) => {
    try {
      setLoading(true);

      const updated = await updateReminder(id, reminder);

      if (updated) {
        setReminders((prev) =>
          prev.map((item) =>
            item.id === id ? updated : item
          )
        );
      } else {
        await loadReminders();
      }

      return {
        success: true,
        message: "Reminder updated successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to update reminder.",
      };
    } finally {
      setLoading(false);
    }
  };

  const removeReminder = async (id) => {
    try {
      setLoading(true);

      await deleteReminder(id);

      setReminders((prev) =>
        prev.filter((item) => item.id !== id)
      );

      return {
        success: true,
        message: "Reminder deleted successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to delete reminder.",
      };
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      setLoading(true);

      const updated = await completeReminder(id);

      if (updated) {
        setReminders((prev) =>
          prev.map((item) =>
            item.id === id ? updated : item
          )
        );
      } else {
        await loadReminders();
      }

      return {
        success: true,
        message: "Reminder marked as completed.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Unable to complete reminder.",
      };
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      reminders,
      loading,
      error,
      loadReminders,
      addReminder,
      editReminder,
      removeReminder,
      markCompleted,
    }),
    [reminders, loading, error]
  );

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  return useContext(ReminderContext);
}