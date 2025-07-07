# Recipe App

## Overview

This is a full-stack recipe application built with React, Express, and TypeScript. The app allows users to discover, search, and save recipes from TheMealDB API. It features user authentication, a shopping cart system for saving favorite recipes, and a responsive design built with Tailwind CSS and shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context API for authentication and cart state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Middleware**: Custom logging and error handling middleware
- **Development**: Hot reload with Vite middleware integration

### Database Strategy
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definitions between client and server
- **Migration**: Drizzle Kit for database migrations
- **Fallback**: In-memory storage implementation for development

## Key Components

### Authentication System
- User registration and login functionality
- JWT-based session management (preparation for backend implementation)
- Context-based authentication state management
- Form validation using React Hook Form with Zod schemas

### Recipe Management
- Integration with TheMealDB API for recipe data
- Search functionality by name and ingredients
- Recipe categorization and filtering
- Detailed recipe views with ingredients and instructions
- Cooking time estimation based on instruction analysis

### Shopping Cart System
- Add/remove recipes to/from cart
- Persistent cart state (localStorage for guests, database for authenticated users)
- Cart sidebar with item management
- Context-based cart state management

### UI Components
- Comprehensive shadcn/ui component library
- Responsive design with mobile-first approach
- Dark/light theme support preparation
- Accessible components with proper ARIA labels

## Data Flow

1. **User Authentication**: Users register/login through modal forms, authentication state is managed globally
2. **Recipe Discovery**: Users browse recipes from TheMealDB API, with search and filter capabilities
3. **Recipe Management**: Users can view detailed recipes and add them to their cart
4. **Cart Management**: Cart items are persisted based on user authentication status
5. **State Synchronization**: Client state is synchronized with server state through React Query

## External Dependencies

### API Integration
- **TheMealDB API**: Primary source for recipe data
  - Search recipes by name and ingredients
  - Get random recipes for homepage
  - Category-based recipe filtering
  - Detailed recipe information with ingredients and instructions

### UI Framework
- **shadcn/ui**: Comprehensive component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives

### Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Static type checking
- **ESLint**: Code linting (prepared for configuration)
- **Drizzle Kit**: Database schema management

## Deployment Strategy

### Production Build
- Client-side code bundled with Vite
- Server-side code bundled with esbuild
- Static assets served from Express server
- Environment-based configuration

### Development Environment
- Hot reload with Vite middleware
- TypeScript compilation with type checking
- Custom logging for API requests
- Error overlay for runtime errors

### Database Deployment
- PostgreSQL database with Drizzle ORM
- Environment variable configuration
- Migration system for schema updates
- Fallback to in-memory storage for development

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```