import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitDashboard,
} from "../api/habitApi";

const HabitContext = createContext();

export function HabitProvider({ children }) {

  const [habits, setHabits] = useState([]);

  const [dashboard, setDashboard] = useState({
    totalHabits: 0,
    activeHabits: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedCount: 0,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadHabits = async () => {

    try {

      setLoading(true);

      const [habitData, dashboardData] =
        await Promise.all([
          getHabits(),
          getHabitDashboard(),
        ]);

      setHabits(habitData);

      setDashboard(dashboardData);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Unable to load habits.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (localStorage.getItem("token")) {

      loadHabits();

    }

  }, []);

  const addHabit = async (habit) => {

    await createHabit(habit);

    await loadHabits();

  };

  const editHabit = async (id, habit) => {

    await updateHabit(id, habit);

    await loadHabits();

  };

  const removeHabit = async (id) => {

    await deleteHabit(id);

    await loadHabits();

  };

  const markCompleted = async (id) => {

    await completeHabit(id);

    await loadHabits();

  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        dashboard,
        loading,
        error,
        loadHabits,
        addHabit,
        editHabit,
        removeHabit,
        markCompleted,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitContext);
}