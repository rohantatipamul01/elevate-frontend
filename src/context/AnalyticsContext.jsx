import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAnalytics } from "../api/analyticsApi";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadAnalytics = async () => {

    try {

      setLoading(true);

      const data = await getAnalytics();

      setAnalytics(data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Unable to load analytics.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (localStorage.getItem("token")) {

      loadAnalytics();

    }

  }, []);

  return (

    <AnalyticsContext.Provider
      value={{
        analytics,
        loading,
        error,
        loadAnalytics,
      }}
    >

      {children}

    </AnalyticsContext.Provider>

  );

}

export function useAnalytics() {

  return useContext(AnalyticsContext);

}