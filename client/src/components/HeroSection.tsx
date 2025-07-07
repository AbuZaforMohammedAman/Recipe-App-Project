import SearchBar from "./SearchBar";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleSearch = (query: string) => {
    setLocation(`/recipes?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        className="relative bg-cover bg-center h-96 flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Recipes
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              From quick weeknight dinners to gourmet weekend projects, find your next favorite dish
            </p>
            
            <SearchBar
              onSearch={handleSearch}
              className="max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
