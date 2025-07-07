import { users, carts, type User, type InsertUser, type Cart, type InsertCart } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Cart methods
  getCartByUserId(userId: number): Promise<Cart[]>;
  addToCart(cartItem: InsertCart): Promise<Cart>;
  removeFromCart(userId: number, recipeId: string): Promise<void>;
  clearCart(userId: number): Promise<void>;
  getCartItem(userId: number, recipeId: string): Promise<Cart | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private carts: Map<number, Cart>;
  private currentUserId: number;
  private currentCartId: number;

  constructor() {
    this.users = new Map();
    this.carts = new Map();
    this.currentUserId = 1;
    this.currentCartId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCartByUserId(userId: number): Promise<Cart[]> {
    return Array.from(this.carts.values()).filter(
      (cartItem) => cartItem.userId === userId,
    );
  }

  async addToCart(cartItem: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const cart: Cart = { 
      id,
      userId: cartItem.userId || null,
      recipeId: cartItem.recipeId,
      recipeName: cartItem.recipeName,
      recipeImage: cartItem.recipeImage || null,
      cookingTime: cartItem.cookingTime || null,
      addedAt: cartItem.addedAt
    };
    this.carts.set(id, cart);
    return cart;
  }

  async removeFromCart(userId: number, recipeId: string): Promise<void> {
    const entries = Array.from(this.carts.entries());
    for (const [id, cartItem] of entries) {
      if (cartItem.userId === userId && cartItem.recipeId === recipeId) {
        this.carts.delete(id);
        break;
      }
    }
  }

  async clearCart(userId: number): Promise<void> {
    const toDelete = Array.from(this.carts.entries())
      .filter(([_, cartItem]) => cartItem.userId === userId)
      .map(([id]) => id);
    
    toDelete.forEach(id => this.carts.delete(id));
  }

  async getCartItem(userId: number, recipeId: string): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cartItem) => cartItem.userId === userId && cartItem.recipeId === recipeId,
    );
  }
}

export const storage = new MemStorage();
