# Invoice Automation Project

## Run the Backend

This document provides the necessary commands to get the application and its required services up and running using Docker.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start Guide

Follow these steps to build and run the entire application stack. All commands should be executed from the root directory of the project (`kodikos-2.0/`).

#### 1. Navigate to the Server Directory

Open your terminal and change your current directory to the `server` folder, which contains the `docker-compose.yml` file , then run it .

```bash
cd kodikos-2.0/server
# build and run
docker-compose up --build
```

## Run the Frontend
# Kodikos 2.0 - Client

A modern React + TypeScript + Vite application for managing invoices and analytics.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

1. Clone the repository and navigate to the client directory:
```bash
cd client
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

### Development

To start the development server with hot module replacement (HMR):

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build

To build the project for production:

```bash
pnpm run build
```

The optimized production build will be generated in the `dist` directory.

### Preview

To preview the production build locally:

```bash
pnpm run preview
```

### Linting

To check code quality with ESLint:

```bash
pnpm run lint
```

## Project Structure (you can check)

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable React components
├── constants/        # Application constants
├── layout/           # Layout components
├── lib/              # Utility functions and helpers
├── pages/            # Page components
│   ├── analytics/    # Analytics page with sub-components
│   ├── dashboard/    # Dashboard page with sub-components
│   ├── outgoing-invoices/  # Outgoing invoices management
│   └── create-invoices/    # Invoice creation page
├── routes/           # Route definitions
└── types/            # TypeScript type definitions
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and style enforcement

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Create production build
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint checks

## Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules configuration
- `.env` - Environment variables

## Features

This project includes:

- Invoice creation and management (incoming and outgoing)
- Analytics dashboard for tracking
- Modern responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- Fast development experience with Vite's HMR
- ESLint integration for code quality

## Environment Variables

Create a `.env` file in the root directory to configure environment-specific settings. See `.env` file for available options.

## Notes

- The React Compiler is not enabled by default due to performance considerations during development
- Fast Refresh is enabled via the @vitejs/plugin-react plugin using Babel
- For production applications, consider enabling stricter TypeScript and ESLint configurations

## Support

For more information on the technologies used:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)