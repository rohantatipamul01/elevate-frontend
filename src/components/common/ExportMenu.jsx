import { useState } from "react";

import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";

export default function ExportMenu({
  onExportPDF,
  onExportExcel,
  buttonText = "Export",
  disabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePDF = () => {
    handleClose();

    if (onExportPDF) {
      onExportPDF();
    }
  };

  const handleExcel = () => {
    handleClose();

    if (onExportExcel) {
      onExportExcel();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DownloadRoundedIcon />}
        onClick={handleOpen}
        disabled={disabled}
      >
        {buttonText}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handlePDF}>
          <ListItemIcon>
            <PictureAsPdfRoundedIcon color="error" />
          </ListItemIcon>

          <ListItemText>
            Export as PDF
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleExcel}>
          <ListItemIcon>
            <TableChartRoundedIcon color="success" />
          </ListItemIcon>

          <ListItemText>
            Export as Excel
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}