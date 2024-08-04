"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Link,
  Box,
} from "@mui/material";

function SignupDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Button variant="contained" onClick={handleClickOpen}>
        Signup / Login
      </Button>
      <Link
        href="/Dashboard"
        underline="none"
        sx={{
          height: "30px",
          width: "200px",
          border: "2px solid #1976d2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          mt: 2,
          color: "inherit",
          textDecoration: "none",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            bgcolor: "#1976d2",
            color: "white",
          },
        }}
      >
        Proceed to Dashboard
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Signup / Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email and password to sign up or log in.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SignupDialog;
