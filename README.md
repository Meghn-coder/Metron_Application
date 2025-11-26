# Metron_Application


# SecureCoda Frontend

This is the frontend for the SecureCoda security monitoring application, built with React and Vite.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **API Proxy:**
   - API requests to `/api` are automatically proxied to the backend server at `http://localhost:3000` (configured in `vite.config.js`).
   - Ensure the backend is running for API calls to work.

## Build for Production

```sh
npm run build
```

## Preview Production Build

```sh
npm run preview
```

## Project Structure

- `src/` - React components, pages, and services
- `package.json` - Project metadata and scripts

## Notes

- Make sure to start the backend server before using the frontend for full functionality.
- For any issues, check the browser console and network tab for API errors.

---
