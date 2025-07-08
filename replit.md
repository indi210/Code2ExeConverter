# Quantum Intel Code2EXE Builder

## Overview

This is a full-stack web application called "Quantum Intel Code2EXE Builder" that allows users to upload Python files and convert them into Windows executable files. The application features a React frontend with a dark-themed UI and an Express.js backend that handles file processing and build management.

## System Architecture

The application follows a modern full-stack architecture with:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data management
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **File Handling**: Multer for file uploads and processing

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components organized in a clear hierarchy
- **UI System**: shadcn/ui component library with consistent dark theme
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom dark theme variables

### Backend Architecture
- **API Routes**: RESTful endpoints for authentication, builds, and file downloads
- **File Processing**: Handles Python file uploads and executable generation
- **Build System**: Manages build lifecycle with status tracking
- **Storage**: In-memory storage implementation with interface for future database integration

### Database Schema
- **Users**: Authentication and user management
- **Builds**: Build tracking with status, metadata, and file information
- **Alerts**: System notifications and security alerts
- **Downloadable Files**: Generated files associated with builds

### Authentication System
- Simple password-based authentication with hardcoded secure password
- Session-based authentication for API access
- Security alerts for unauthorized access attempts

## Data Flow

1. **User Authentication**: Users authenticate with a password to access the builder
2. **File Upload**: Python files are uploaded via drag-and-drop interface
3. **Build Processing**: Server processes files and tracks build status
4. **File Generation**: Executable files are generated with security hashes
5. **Download Management**: Users can download generated executables and associated files

## External Dependencies

### Frontend Dependencies
- React ecosystem with TypeScript support
- Radix UI primitives for accessible components
- TanStack Query for server state management
- Tailwind CSS for styling
- React Hook Form for form handling

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM with PostgreSQL support
- Multer for file upload handling
- Crypto for hash generation
- Connect-pg-simple for session storage

### Development Tools
- Vite for frontend development and building
- ESBuild for backend compilation
- TypeScript for type safety
- PostCSS and Autoprefixer for CSS processing

## Deployment Strategy

The application is configured for deployment with:

- **Development**: Concurrent frontend and backend development with Vite dev server
- **Production**: Static frontend build served by Express server
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Environment variables for database connection and configuration

The build process compiles both frontend and backend:
- Frontend: Vite builds React app to static files
- Backend: ESBuild compiles TypeScript server to JavaScript
- Database: Drizzle handles schema migrations

## Changelog
- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.