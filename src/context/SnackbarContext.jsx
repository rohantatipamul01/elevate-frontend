import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  const value = useMemo(
    () => ({
      snackbar,
      showSnackbar,
      closeSnackbar,
    }),
    [snackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}