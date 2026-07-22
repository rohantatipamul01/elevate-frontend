import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const ColorModeContext = createContext();

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((previousMode) =>
      previousMode === "light"
        ? "dark"
        : "light"
    );
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}