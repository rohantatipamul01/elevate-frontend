import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function DeleteTaskDialog({
  open,
  task,
  onClose,
  onConfirm,
}) {
  const handleDelete = () => {
    if (task) {
      onConfirm(task);
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Task
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete
          <strong> {task?.title}</strong>?
        </Typography>

        <Typography
          color="error"
          sx={{ mt: 2 }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}