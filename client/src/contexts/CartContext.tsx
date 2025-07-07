import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/recipe';
import { Cart } from '@shared/schema';
import { useAuth } from './AuthContext';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (recipeId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => number;
  isInCart: (recipeId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Load cart data on mount and auth state change
  useEffect(() => {
    loadCartData();
  }, [isAuthenticated, user]);

  const loadCartData = async () => {
    if (isAuthenticated && user) {
      try {
        const response = await fetch(`/api/cart/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const transformedItems = data.cartItems.map((item: Cart) => ({
            id: item.recipeId,
            name: item.recipeName,
            image: item.recipeImage || '',
            cookingTime: item.cookingTime || '',
            quantity: 1,
          }));
          setCartItems(transformedItems);
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    } else {
      // Load from localStorage for non-authenticated users
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
    }
  };

  const saveToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('localCart', JSON.stringify(items));
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    const newItem: CartItem = { ...item, quantity: 1 };

    if (isAuthenticated && user) {
      try {
        await apiRequest('POST', '/api/cart', {
          userId: user.id,
          recipeId: item.id,
          recipeName: item.name,
          recipeImage: item.image,
          cookingTime: item.cookingTime,
          addedAt: Date.now(),
        });
        
        setCartItems(prev => [...prev, newItem]);
        toast({
          title: "Success",
          description: "Recipe added to cart successfully!",
        });
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add recipe to cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Add to localStorage for non-authenticated users
      const newItems = [...cartItems, newItem];
      setCartItems(newItems);
      saveToLocalStorage(newItems);
      toast({
        title: "Success",
        description: "Recipe added to cart successfully!",
      });
    }
  };

  const removeFromCart = async (recipeId: string) => {
    if (isAuthenticated && user) {
      try {
        await apiRequest('DELETE', `/api/cart/${user.id}/${recipeId}`);
        setCartItems(prev => prev.filter(item => item.id !== recipeId));
        toast({
          title: "Success",
          description: "Recipe removed from cart",
        });
      } catch (error) {
        console.error('Failed to remove from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove recipe from cart",
          variant: "destructive",
        });
      }
    } else {
      const newItems = cartItems.filter(item => item.id !== recipeId);
      setCartItems(newItems);
      saveToLocalStorage(newItems);
      toast({
        title: "Success",
        description: "Recipe removed from cart",
      });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated && user) {
      try {
        await apiRequest('DELETE', `/api/cart/${user.id}`);
        setCartItems([]);
        toast({
          title: "Success",
          description: "Cart cleared successfully",
        });
      } catch (error) {
        console.error('Failed to clear cart:', error);
        toast({
          title: "Error",
          description: "Failed to clear cart",
          variant: "destructive",
        });
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('localCart');
      toast({
        title: "Success",
        description: "Cart cleared successfully",
      });
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (recipeId: string) => {
    return cartItems.some(item => item.id === recipeId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
