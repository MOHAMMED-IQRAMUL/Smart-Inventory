
"use client";
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import AboutUs from "../Dashboard/AboutUs.js";

function AboutPage() {
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
        
         <AboutUs/>
      </Container>
    </Box>
  );
}

export default AboutPage;
