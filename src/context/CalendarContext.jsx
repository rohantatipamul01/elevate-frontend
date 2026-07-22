import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCalendarEvents } from "../api/calendarApi";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadCalendarEvents = async () => {
    try {
      setLoading(true);

      const data = await getCalendarEvents();

      setEvents(data);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Unable to load calendar events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadCalendarEvents();
    }
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        events,
        loading,
        error,
        loadCalendarEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  return useContext(CalendarContext);
}