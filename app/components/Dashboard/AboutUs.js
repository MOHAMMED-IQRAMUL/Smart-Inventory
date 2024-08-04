import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function AboutUs() {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Your Inventory! We are dedicated to helping you manage your pantry, inventory, and recipes with ease. Our goal is to simplify your kitchen management and ensure you always know what you have on hand.
      </Typography>
      <Typography variant="body1" paragraph>
        Our team is passionate about creating tools that make your life easier. We believe that a well-organized kitchen leads to a more enjoyable cooking experience. Whether you are a professional chef or a home cook, our application is designed to meet your needs.
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for choosing Your Inventory. We are constantly working to improve our services and welcome any feedback you may have.
      </Typography>
    </Paper>
  );
}

export default AboutUs;
