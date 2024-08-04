"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Modal,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {  query, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";

export default function Pantry() {
  const [inventory, setInventory] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [Fetched, setFetched] = useState(true);

  const updateInventory = async () => {
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
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const fetchRecipes = async () => {
    const ingredients = inventory.map((item) => item.name).join(",");
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`
      );
      setRecipes(response.data);
      setFetched(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchRecipeDetails = async (id) => {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
      );
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <Box width="100%" height="100%">
      <Box
        maxWidth="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top={300}
      >
        {Fetched && (
          <>
            <Typography variant="h4" color="#333">
              Recipes
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                fetchRecipes();
              }}
            >
              Fetch Recipes
            </Button>
          </>
        )}
      </Box>
      <Box
        maxWidth="100%"
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
      >
        {recipes.map((recipe) => (
          <Card key={recipe.id} sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={recipe.image}
              alt={recipe.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {recipe.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.missedIngredientCount} ingredients needed from pantry
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  fetchRecipeDetails(recipe.id);
                }}
              >
                View Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      {selectedRecipe && (
        <Box maxWidth="100%" padding={2}>
          <Typography variant="h4" gutterBottom>
            {selectedRecipe.title}
          </Typography>
          <CardMedia
            component="img"
            height="300"
            image={selectedRecipe.image}
            alt={selectedRecipe.title}
          />
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {selectedRecipe.extendedIngredients.map((ingredient) => (
              <ListItem key={ingredient.id}>
                <ListItemText primary={ingredient.original} />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <List>
            {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
              <ListItem key={step.number}>
                <ListItemText primary={`${step.number}. ${step.step}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
