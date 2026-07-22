import {
  Alert,
  Slide,
  Snackbar,
} from "@mui/material";

import { useSnackbar } from "../../context/SnackbarContext";

function Transition(props) {
  return (
    <Slide
      {...props}
      direction="left"
    />
  );
}

export default function AppSnackbar() {
  const {
    snackbar,
    closeSnackbar,
  } = useSnackbar();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      TransitionComponent={Transition}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        elevation={6}
        sx={{
          width: "100%",
          minWidth: 320,
          borderRadius: 3,
          fontWeight: 600,
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}