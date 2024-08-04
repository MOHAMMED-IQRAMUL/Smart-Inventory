"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import SignupDialog from "./SignupDialog";

function HomePage() {
  return (
    <Box 
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: 2,
    }}
     >
      <Container 
       
      >
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Smart Inventory Management System
        </Typography>
        <SignupDialog />
        <Typography
        textAlign="center" textColor="red"
        >This is A Demo Website, Hence No SignUp or Login Required You May Proceed Directly To The Dashboard Website</Typography>
      </Container>
    </Box>
  );
}

export default HomePage;
