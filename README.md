# Course Dashboard - Teachable Integration

A modern dashboard application that displays your Teachable courses and student enrollment data with clean visualizations and filtering capabilities.

## Overview

This application provides a comprehensive view of your Teachable courses, including student enrollment statistics, completion rates, and detailed student information. It features a responsive interface with real-time search filtering and course categorization.

## Technologies Used

- [Vite](https://vitejs.dev) - Next generation frontend tooling
- [ReactJS](https://reactjs.org) - UI component library
- [TypeScript](https://www.typescriptlang.org) - Static type checking
- [Vitest](https://vitest.dev) - Unit testing framework
- [Testing Library](https://testing-library.com) - Component testing utilities
- [Tailwindcss](https://tailwindcss.com) - Utility-first CSS framework
- [Eslint](https://eslint.org) - Code linting
- [Prettier](https://prettier.io) - Code formatting
- [Axios](https://axios-http.com) - HTTP client

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- A Teachable API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/teachable-dashboard.git
   cd teachable-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the project root with your API key:

   ```
   VITE_API_KEY=your_teachable_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:5173`

### API Configuration

The application uses a proxy to avoid CORS issues during local development. Ensure your `vite.config.ts` includes the server proxy configuration:

```typescript
export default defineConfig({
  // other config
  server: {
    proxy: {
      '/api': {
        target: 'https://api.teachable.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## Features

- **Course Overview**: View all your published and unpublished courses
- **Student Management**: See all students enrolled in each course
- **Enrollment Statistics**: View average completion rates and student progress
- **Search Functionality**: Filter students by name or email
- **Responsive Design**: Works on desktop and mobile devices

## Running Tests

```bash
npm run test
# or
yarn test
```

To run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```
