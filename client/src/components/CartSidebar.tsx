import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, clearCart, getCartCount } = useCart();

  const handleRemoveItem = async (recipeId: string) => {
    await removeFromCart(recipeId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
            {getCartCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getCartCount()}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some delicious recipes to get started!</p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral text-sm">{item.name}</h4>
                        {item.cookingTime && (
                          <p className="text-xs text-gray-600 mt-1">
                            ⏱️ {item.cookingTime}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="pt-4 border-t bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-neutral">Total Recipes:</span>
                  <Badge variant="default" className="bg-primary text-white">
                    {getCartCount()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
