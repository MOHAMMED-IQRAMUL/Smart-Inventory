"use client";
import { useState, useEffect, useMemo } from "react";
import { firestore } from "@/firebase";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Modal,
  InputBase,
} from "@mui/material";
import {
  getDoc,
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const drawerWidth = 240;

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

const AddItemModal = ({ open, handleClose, addItem }) => {
  const [itemName, setItemName] = useState("");

  const handleAddItem = () => {
    addItem(itemName);
    setItemName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddItem}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

const ItemRow = ({ name, quantity, addItem, removeItem }) => (
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
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => addItem(name)}>
        Add
      </Button>
      <Button variant="contained" onClick={() => removeItem(name)}>
        Remove
      </Button>
    </Stack>
  </Box>
);

export default function Pantry() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
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

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "inventory"), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await updateInventory();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "inventory"), item);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
      }
      await updateInventory();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
    //   height="120%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={5}
    >
      <Box
        maxWidth="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        
      >
        <Stack direction = "column">
        <Typography variant="h2" color="#333">
          Inventory Items
        </Typography>
        <Typography   color="#333">
          (ADD, REMOVE AND MANAGE YOUR INVENTORY)
        </Typography>

        </Stack>
      </Box>

      <Stack direction="row">
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
        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
      </Stack>

      <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />

      <Box width="100%" maxWidth="100%">
        <Stack maxWidth="100%" height="500px" spacing={2}  overflow="scroll">
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
            <Typography fontSize={35} color="#333" textAlign="left" width="100px">
              Name
            </Typography>
            <Typography fontSize={35} color="#333" textAlign="center">
              Quantity
            </Typography>
            <Typography fontSize={35} color="#333" textAlign="center">
              Edit
            </Typography>
          </Box>
          {filteredInventory.map(({ name, quantity }) => (
            <ItemRow key={name} name={name} quantity={quantity} addItem={addItem} removeItem={removeItem} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
