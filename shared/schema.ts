import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  password: text("password").notNull(),
});

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  recipeId: text("recipe_id").notNull(),
  recipeName: text("recipe_name").notNull(),
  recipeImage: text("recipe_image"),
  cookingTime: text("cooking_time"),
  addedAt: integer("added_at").notNull(), // timestamp
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  phone: true,
  password: true,
});

export const insertCartSchema = createInsertSchema(carts).pick({
  userId: true,
  recipeId: true,
  recipeName: true,
  recipeImage: true,
  cookingTime: true,
  addedAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCart = z.infer<typeof insertCartSchema>;
export type Cart = typeof carts.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
