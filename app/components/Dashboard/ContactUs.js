import React from "react";
import { Box, Typography, Paper, TextField, Button, Stack } from "@mui/material";

function ContactUs() {
  return (
    <>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us using the form below.
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
          <Button variant="outlined" color="secondary" type="reset">
            Reset
          </Button>
        </Stack>
      </Box>
    </Paper>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography textAlign="center">
      Thnaks For Visiting The Website
      </Typography> 
      
    </Paper>
    </>
  );
}

export default ContactUs;
