# Metron_Application
# SecureCoda Backend

This is the backend for the SecureCoda security monitoring application, built with Node.js and Express.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm
- (Optional) PostgreSQL or your configured database

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Environment Variables:**
   - Create a `.env` file in the backend directory if required.
   - Example variables:
     ```
     PORT=3000
     DATABASE_URL=your_database_url
     ```

3. **Database Setup:**
   - Ensure your database is running and accessible.
   - Run migrations or seed scripts if provided.

4. **Start the server:**
   ```sh
   npm start
   ```
   The API will be available at [http://localhost:3000/api](http://localhost:3000/api).

## API Endpoints

- `GET /api/alerts` - List alerts
- `GET /api/alerts/:id` - Get alert by ID
- `PATCH /api/alerts/:id/resolve` - Resolve an alert
- `POST /api/remediate/unpublish` - Unpublish remediation
- `POST /api/remediate/remove-share` - Remove share remediation
- `DELETE /api/remediate/delete-row` - Delete row remediation
- `DELETE /api/remediate/delete-doc` - Delete document remediation
- `GET /api/settings` - Get settings
- `PATCH /api/settings` - Update settings

## Project Structure

- `src/` - Express routes, controllers, and models
- `.env` - Environment variables (not committed)
- `package.json` - Project metadata and scripts

## Notes

- The backend must be running for the frontend to function correctly.
- Check logs for errors and ensure the database connection is successful.

---
Set Frontend for full functionality.
- For any issues, check the browser console and network tab for API errors.

---
