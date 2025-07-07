import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertCartSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // MealDB API proxy endpoints
  app.get("/api/recipes/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: "Search query is required" });
      }

      // Search by name
      const nameResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
      const nameData = await nameResponse.json();
      
      // Search by ingredient
      const ingredientResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${q}`);
      const ingredientData = await ingredientResponse.json();

      const nameResults = nameData.meals || [];
      const ingredientResults = ingredientData.meals || [];

      // Combine and deduplicate results
      const allResults = [...nameResults];
      ingredientResults.forEach(meal => {
        if (!allResults.find(existing => existing.idMeal === meal.idMeal)) {
          allResults.push(meal);
        }
      });

      res.json({ meals: allResults });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Failed to search recipes" });
    }
  });

  app.get("/api/recipes/random", async (req, res) => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Random recipe error:", error);
      res.status(500).json({ message: "Failed to get random recipe" });
    }
  });

  app.get("/api/recipes/categories", async (req, res) => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Categories error:", error);
      res.status(500).json({ message: "Failed to get categories" });
    }
  });

  app.get("/api/recipes/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Category recipes error:", error);
      res.status(500).json({ message: "Failed to get category recipes" });
    }
  });

  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Recipe detail error:", error);
      res.status(500).json({ message: "Failed to get recipe details" });
    }
  });

  // Authentication endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Register error:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user || user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Cart endpoints
  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await storage.getCartByUserId(userId);
      res.json({ cartItems });
    } catch (error) {
      console.error("Get cart error:", error);
      res.status(500).json({ message: "Failed to get cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartData = insertCartSchema.parse(req.body);
      
      // Check if item already exists in cart
      const existingItem = await storage.getCartItem(cartData.userId!, cartData.recipeId);
      if (existingItem) {
        return res.status(400).json({ message: "Recipe already in cart" });
      }

      const cartItem = await storage.addToCart(cartData);
      res.status(201).json({ cartItem });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart data", errors: error.errors });
      }
      console.error("Add to cart error:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.delete("/api/cart/:userId/:recipeId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipeId = req.params.recipeId;
      
      await storage.removeFromCart(userId, recipeId);
      res.json({ message: "Recipe removed from cart" });
    } catch (error) {
      console.error("Remove from cart error:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      await storage.clearCart(userId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      console.error("Clear cart error:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
