"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ContactUs from "../Dashboard/ContactUs";

function ContactPage() {
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
    }}>
      <Container>
         
        <ContactUs />
      </Container>
    </Box>
  );
}

export default ContactPage;
