import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Users, Star, Plus, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { transformMealDBRecipe, estimateCookingTime } from "@/lib/mealdb";
import { useCart } from "@/contexts/CartContext";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart } = useCart();

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: [`/api/recipes/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      return data.meals ? transformMealDBRecipe(data.meals[0]) : null;
    },
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (recipe && !isInCart(recipe.id)) {
      await addToCart({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        cookingTime: estimateCookingTime(recipe.instructions),
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-light">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-red-600">Failed to load recipe. Please try again later.</p>
          <Button asChild className="mt-4">
            <Link href="/recipes">Back to Recipes</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Header />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/recipes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Link>
          </Button>

          {isLoading ? (
            <Card className="overflow-hidden">
              <Skeleton className="w-full h-64 md:h-80" />
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-32 mt-4 md:mt-0" />
                </div>
                <Skeleton className="h-20 w-full mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : recipe ? (
            <Card className="overflow-hidden">
              {/* Recipe Image */}
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 md:h-80 object-cover"
              />

              <CardContent className="p-6 md:p-8">
                {/* Recipe Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-neutral mb-2">{recipe.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-secondary mr-1 fill-current" />
                        <span>4.5</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{estimateCookingTime(recipe.instructions)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>4 servings</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="default">{recipe.category}</Badge>
                      <Badge variant="secondary">{recipe.area}</Badge>
                      {recipe.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={isInCart(recipe.id)}
                    className="bg-primary text-white hover:bg-primary/90 mt-4 md:mt-0"
                  >
                    {isInCart(recipe.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>

                {/* Recipe Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-neutral mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {recipe.instructions.substring(0, 200)}...
                  </p>
                </div>

                {/* Ingredients and Instructions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-xl font-semibold text-neutral mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span>
                            {ingredient.measure} {ingredient.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-xl font-semibold text-neutral mb-4">Instructions</h3>
                    <div className="space-y-3">
                      {recipe.instructions.split('.').filter(step => step.trim()).map((step, index) => (
                        <div key={index} className="flex">
                          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step.trim()}.</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* YouTube Video */}
                {recipe.youtube && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-neutral mb-4">Video Tutorial</h3>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <iframe
                        src={recipe.youtube.replace('watch?v=', 'embed/')}
                        title="Recipe Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-80"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Recipe not found.</p>
              <Button asChild className="mt-4">
                <Link href="/recipes">Back to Recipes</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
