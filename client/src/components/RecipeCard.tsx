import { Clock, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types/recipe";
import { useCart } from "@/contexts/CartContext";
import { estimateCookingTime } from "@/lib/mealdb";
import { Link } from "wouter";

interface RecipeCardProps {
  recipe: Recipe;
  size?: 'small' | 'medium' | 'large';
  showAddToCart?: boolean;
}

export default function RecipeCard({ recipe, size = 'medium', showAddToCart = true }: RecipeCardProps) {
  const { addToCart, isInCart } = useCart();
  const cookingTime = estimateCookingTime(recipe.instructions || '');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart(recipe.id)) {
      await addToCart({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        cookingTime,
      });
    }
  };

  const cardClasses = {
    small: "w-full",
    medium: "w-full",
    large: "w-full"
  };

  const imageClasses = {
    small: "h-32",
    medium: "h-48",
    large: "h-64"
  };

  const contentClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8"
  };

  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <Card className={`${cardClasses[size]} bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className={`w-full ${imageClasses[size]} object-cover`}
        />
        <CardContent className={contentClasses[size]}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold text-neutral ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-xl' : 'text-2xl'}`}>
              {recipe.name}
            </h3>
            <div className="flex items-center text-secondary">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium">4.5</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {recipe.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {recipe.area}
            </Badge>
          </div>
          
          <p className={`text-gray-600 mb-4 line-clamp-2 ${size === 'small' ? 'text-sm' : ''}`}>
            {recipe.instructions && recipe.instructions.length > 0 
              ? `${recipe.instructions.substring(0, size === 'small' ? 80 : 100)}...`
              : 'Delicious recipe with detailed cooking instructions.'
            }
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{cookingTime}</span>
            </div>
            
            {showAddToCart && (
              <Button
                onClick={handleAddToCart}
                disabled={isInCart(recipe.id)}
                className={`${
                  size === 'small' ? 'text-xs px-3 py-1' : 'px-4 py-2'
                } bg-primary text-white hover:bg-primary/90 transition-colors duration-200`}
              >
                <Plus className="h-4 w-4 mr-1" />
                {isInCart(recipe.id) ? 'Added' : 'Add to Cart'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
