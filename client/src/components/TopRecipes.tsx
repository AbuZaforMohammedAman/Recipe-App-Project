import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RecipeCard from "./RecipeCard";
import { transformMealDBRecipe } from "@/lib/mealdb";
import { MealDBRecipe } from "@/types/recipe";

export default function TopRecipes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/recipes/random'],
    queryFn: async () => {
      // Fetch 6 random recipes
      const promises = Array.from({ length: 6 }, () =>
        fetch('/api/recipes/random').then(res => res.json())
      );
      const results = await Promise.all(promises);
      return results.map(result => transformMealDBRecipe(result.meals[0]));
    },
  });

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Failed to load recipes. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Top Recipes
          </h2>
          <p className="text-lg text-gray-600">
            Discover our most popular and highest-rated recipes
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
