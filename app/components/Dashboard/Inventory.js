"use client";
import { useState, useEffect, useMemo } from "react";
import { firestore } from "@/firebase";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Box, Typography, Stack, InputBase } from "@mui/material";
import { query, collection, getDocs } from "firebase/firestore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      border: "2px solid #1976d2",
      borderRadius: "5px",
    },
  },
}));

const ItemRow = ({ name, quantity }) => (
  <Box
    key={name}
    maxwidth="100%"
    minHeight="80px"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    padding="5px"
  >
    <Typography width="100px" variant="h5" color="#333" textAlign="left">
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Typography>
    <Typography variant="h5" color="#333" textAlign="center">
      {quantity}
    </Typography>
  </Box>
);

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, "inventory"));
      const docs = await getDocs(snapshot);
      const inventoryList = [];
      docs.forEach((doc) => {
        inventoryList.push({
          name: doc.id,
          ...doc.data(),
        });
      });
      setInventory(inventoryList);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box
        maxWidth="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" color="#333">
          Inventory Items
        </Typography>
      </Box>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Search>

      <Box width="100%" maxWidth="100%">
        <Stack maxWidth="100%" height="500px" spacing={2} overflow="scroll">
          <Box
            key="header"
            maxWidth="100%"
            minHeight="100px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="5px"
            marginRight={70}
          >
            <Typography
              fontSize={40}
              variant="h5"
              color="#333"
              textAlign="left"
              width="100px"
            >
              Name
            </Typography>
            <Typography
              fontSize={40}
              variant="h5"
              color="#333"
              textAlign="center"
            >
              Quantity
            </Typography>
          </Box>
          {filteredInventory.map(({ name, quantity }) => (
            <ItemRow key={name} name={name} quantity={quantity} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
