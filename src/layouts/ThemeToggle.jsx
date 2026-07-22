import {
  IconButton,
  Tooltip,
} from "@mui/material";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";

import { useColorMode } from "../../context/ColorModeContext";

export default function ThemeToggle() {
  const {
    mode,
    toggleColorMode,
  } = useColorMode();

  return (
    <Tooltip
      title={
        mode === "light"
          ? "Switch to Dark Mode"
          : "Switch to Light Mode"
      }
      arrow
    >
      <IconButton
        color="inherit"
        onClick={toggleColorMode}
        aria-label="Toggle theme"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          transition: "all 0.25s ease",
          "&:hover": {
            bgcolor: "action.hover",
            transform: "rotate(15deg)",
          },
        }}
      >
        {mode === "light" ? (
          <DarkModeRoundedIcon />
        ) : (
          <LightModeRoundedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}