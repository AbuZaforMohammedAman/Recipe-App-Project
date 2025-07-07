import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import { transformMealDBRecipe } from "@/lib/mealdb";
import { Recipe } from "@/types/recipe";

export default function AllRecipes() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['/api/recipes/categories'],
    queryFn: async () => {
      const response = await fetch('/api/recipes/categories');
      return response.json();
    },
  });

  // Fetch recipes based on search or category
  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['/api/recipes', searchQuery, selectedCategory],
    queryFn: async () => {
      let url = '';
      
      if (searchQuery) {
        url = `/api/recipes/search?q=${encodeURIComponent(searchQuery)}`;
      } else if (selectedCategory !== 'all') {
        url = `/api/recipes/category/${selectedCategory}`;
      } else {
        // Get random recipes for "all" category
        const promises = Array.from({ length: 12 }, () =>
          fetch('/api/recipes/random').then(res => res.json())
        );
        const results = await Promise.all(promises);
        return results.map(result => transformMealDBRecipe(result.meals[0]));
      }
      
      const response = await fetch(url);
      const data = await response.json();
      return data.meals ? data.meals.map(transformMealDBRecipe) : [];
    },
    enabled: true,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLocation(`/recipes?search=${encodeURIComponent(query)}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when changing category
    setLocation('/recipes');
  };

  // Sort recipes
  const sortedRecipes = recipes ? [...recipes].sort((a: Recipe, b: Recipe) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'area':
        return a.area.localeCompare(b.area);
      default:
        return 0;
    }
  }) : [];

  return (
    <div className="min-h-screen bg-light">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
              All Recipes
            </h1>
            <p className="text-lg text-gray-600">
              Explore our complete collection of delicious recipes
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              onSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 max-w-xs">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.categories?.map((category: any) => (
                    <SelectItem key={category.idCategory} value={category.strCategory}>
                      {category.strCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="max-w-xs">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="area">Cuisine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load recipes. Please try again later.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <Skeleton className="w-full h-40" />
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} size="small" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No recipes found. Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
