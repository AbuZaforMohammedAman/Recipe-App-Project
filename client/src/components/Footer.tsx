import { Utensils, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="h-8 w-8 text-primary mr-2" />
              <h3 className="text-xl font-bold">RecipeApp</h3>
            </div>
            <p className="text-gray-300">
              Discover, cook, and share amazing recipes from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/recipes" className="hover:text-primary transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Breakfast" className="hover:text-primary transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Lunch" className="hover:text-primary transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Dinner" className="hover:text-primary transition-colors">
                  Dinner
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/recipes?category=Dessert" className="hover:text-primary transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Vegetarian" className="hover:text-primary transition-colors">
                  Vegetarian
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Chicken" className="hover:text-primary transition-colors">
                  Chicken
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=Seafood" className="hover:text-primary transition-colors">
                  Seafood
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@recipeapp.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 mt-4">
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 RecipeApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
