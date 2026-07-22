import { createContext, useContext, useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [dashboard, setDashboard] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    productivity: 0,
    dueToday: 0,
    overdueTasks: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboard();

      setDashboard(data);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadDashboard();
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        error,
        loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}