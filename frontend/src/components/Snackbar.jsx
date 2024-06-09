import React from "react";
import { Snackbar as Toast, Alert } from "@mui/material";

const Snackbar = ({ openSnackbar, setOpenSnackbar, type, message }) => {
  return (
    <>
      <Toast
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={type}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message}
        </Alert>
      </Toast>
    </>
  );
};

export default Snackbar;
