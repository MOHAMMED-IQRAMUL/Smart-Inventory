"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import HomePage from './components/app/HomePage.js';
import AboutPage from './components/app/AboutPage.js';
import ContactPage from './components/app/ContactPage.js';
import CustomTabPanel from './components/CustomTabPanel.js';

export default function Home() {
  const [value, setValue] = React.useState(0); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} height="100vh">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Inventory Management" />
          <Tab label="About Us" />
          <Tab label="Contact Us" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HomePage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AboutPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ContactPage />
      </CustomTabPanel>
    </Box>
  );
}
