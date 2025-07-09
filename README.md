# Recipe App

A full-stack recipe application built with React, Express, and TypeScript that allows users to discover, search, and save recipes from TheMealDB API.

## Features Implemented

### ✅ Authentication System
- **User Registration**: Complete signup form with name, email, phone, and password validation
- **User Login**: Secure login system with email and password
- **Session Management**: Persistent user sessions using localStorage
- **Form Validation**: Client-side validation using React Hook Form and Zod schemas
- **Error Handling**: Comprehensive error messages for authentication failures

### ✅ Recipe Management
- **MealDB API Integration**: Real-time recipe data from TheMealDB API
- **Recipe Search**: Unified search functionality by recipe name and ingredients
- **Recipe Categories**: Browse recipes by food categories (Dessert, Vegetarian, Chicken, etc.)
- **Recipe Details**: Full recipe pages with ingredients, instructions, and cooking videos
- **Cooking Time Estimation**: Smart algorithm to estimate cooking time from instructions
- **Recipe Ratings**: Visual star ratings for user experience

### ✅ Shopping Cart System
- **Add to Cart**: Save favorite recipes for later cooking
- **Local Storage**: Cart persistence for non-authenticated users
- **Database Storage**: Cart synchronization for authenticated users
- **Cart Management**: Add, remove, and clear cart functionality
- **Cart Count**: Real-time cart item counter in navigation
- **Cart Sidebar**: Slide-out cart panel with recipe management

### ✅ User Interface
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Modern UI Components**: Built with shadcn/ui component library
- **Hero Section**: Attractive landing page with search functionality
- **Recipe Cards**: Beautiful recipe cards with images, ratings, and quick actions
- **Navigation**: Clean header with authentication and cart access
- **Footer**: Comprehensive footer with links and contact information

### ✅ Technical Features
- **TypeScript**: Full type safety across frontend and backend
- **React Query**: Efficient data fetching and caching
- **Context API**: Global state management for auth and cart
- **Wouter Routing**: Client-side routing for single-page application
- **Express Server**: RESTful API backend with proper error handling
- **In-Memory Storage**: Development-ready storage system
- **Real-time Updates**: Live cart updates and recipe synchronization

## Bug Fixes Implemented

### 🐛 Search Functionality
- **Fixed**: Unified search now properly searches both recipe names and ingredients
- **Issue**: Search was limited to only recipe names
- **Solution**: Combined MealDB API calls for both name and ingredient searches with deduplication

### 🐛 Recipe Instructions Handling
- **Fixed**: Recipe cards no longer crash when instructions are undefined
- **Issue**: TypeError when recipe instructions were missing
- **Solution**: Added null checking and fallback values for recipe data

### 🐛 Cart State Management
- **Fixed**: Cart properly syncs between local storage and authenticated user storage
- **Issue**: Cart items were lost when switching between auth states
- **Solution**: Implemented proper cart migration and state synchronization

### 🐛 Type Safety Issues
- **Fixed**: Resolved TypeScript compilation errors in storage and routing
- **Issue**: Implicit any types and incompatible type assignments
- **Solution**: Added proper type annotations and fixed type mismatches

### 🐛 Dialog Accessibility
- **Fixed**: Authentication modal now has proper ARIA labels
- **Issue**: Missing aria-describedby warnings in console
- **Solution**: Added proper accessibility attributes for screen readers

## Pages and Navigation

### 🏠 Home Page (`/`)
- Hero section with search functionality
- Featured recipes carousel
- Modern landing page design

### 📖 All Recipes Page (`/recipes`)
- Complete recipe collection
- Category filtering
- Search functionality
- Sorting options (name, category, cuisine)

### 🍽️ Recipe Detail Page (`/recipe/:id`)
- Full recipe information
- Ingredients list with measurements
- Step-by-step cooking instructions
- Embedded cooking videos
- Add to cart functionality

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Recipes
- `GET /api/recipes/search?q=query` - Search recipes
- `GET /api/recipes/random` - Get random recipe
- `GET /api/recipes/categories` - Get all categories
- `GET /api/recipes/category/:category` - Get recipes by category
- `GET /api/recipes/:id` - Get recipe details

### Cart Management
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart` - Add recipe to cart
- `DELETE /api/cart/:userId/:recipeId` - Remove recipe from cart
- `DELETE /api/cart/:userId` - Clear user's cart

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** for database schema
- **In-memory storage** for development
- **Zod** for API validation

### External APIs
- **TheMealDB API** for recipe data

## Development Features

### Code Quality
- Full TypeScript implementation
- ESLint configuration ready
- Proper error handling throughout
- Responsive design patterns
- Accessibility best practices

### Performance
- Efficient API caching with React Query
- Optimized image loading
- Minimal bundle size with proper imports
- Fast search with debouncing ready

## Time Estimate

**Total Development Time: ~12-15 hours**

- Authentication system: 3-4 hours
- Recipe API integration: 2-3 hours
- Cart functionality: 3-4 hours
- UI/UX implementation: 3-4 hours
- Bug fixes and testing: 1-2 hours

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5000`



