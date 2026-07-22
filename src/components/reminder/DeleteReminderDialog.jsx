import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteReminderDialog({
  open,
  reminder,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Reminder
      </DialogTitle>

      <DialogContent>

        <Typography>

          Are you sure you want to delete

          <strong>
            {" "}
            {reminder?.title}
          </strong>

          ?

        </Typography>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}