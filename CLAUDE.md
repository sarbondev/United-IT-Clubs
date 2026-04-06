# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UITC is a monorepo with three packages for a content management platform (company portfolio site + admin dashboard):

- **server/** — Express.js REST API with MongoDB/Mongoose
- **client/** — Public-facing React portal (Vite + Tailwind CSS)
- **admin/** — Admin dashboard React app (Vite + Tailwind CSS + Sass)

## Commands

### Server
```bash
cd server && npm run dev     # Start with nodemon (development)
cd server && npm start       # Start with node (production)
```

### Client
```bash
cd client && npm run dev     # Vite dev server
cd client && npm run build   # Production build
cd client && npm run lint    # ESLint
```

### Admin
```bash
cd admin && npm run dev      # Vite dev server
cd admin && npm run build    # Production build
cd admin && npm run lint     # ESLint
```

No test framework is configured in any package.

## Architecture

### Server (`server/`)

Entry point: `server/index.js` — Express app connecting to MongoDB via `process.env.MONGODB_URI`, serves static files from `/uploads`, runs on port 3000.

**API routes** (all under `/api/`):
- `/api/admin` — Auth (login) + admin CRUD
- `/api/courses`, `/api/projects`, `/api/services`, `/api/team` — Entity CRUD
- `/api/upload` / `/api/removeFile` — File upload/deletion

**Models**: Admin, Course, Project, Service, Team — all Mongoose schemas in `server/models/`.

**Middleware**:
- `isExisted` — JWT auth guard (verifies Bearer token from Authorization header, secret from `JWTSECRETKEY` env var)
- `uploadFiles` — Multer disk storage (5MB max, image/* only, hashed filenames to `/uploads`)
- `generateToken` — JWT creation (7-day expiry)
- `removeFiles` — Filesystem file deletion

### Client (`client/`)

Public read-only portal. Routes: Home page + ProjectDetail page. Uses `fetch()` for data retrieval (no auth needed). Data fetching helper in `client/src/middlewares/Fetcher.jsx` (SWR-compatible fetcher).

### Admin (`admin/`)

Authenticated dashboard for managing all content entities. Route guarding based on Redux `isAuth` state.

**State management** (Redux Toolkit):
- `MainSlice` (`src/toolkit/Slicer.jsx`) — Manages data arrays for admins, courses, projects, services, team with pending/success/error patterns
- `UserSlicer` (`src/toolkit/UserSlicer.jsx`) — Auth state (`isAuth`, user data)

**HTTP client**: Axios instance in `admin/src/middlewares/Axios.jsx` auto-injects JWT from `localStorage("uitctoken")` into Authorization header.

### Auth Flow

Login → JWT token → stored in localStorage as `uitctoken` → Axios interceptor adds to requests → admin app calls `/api/admin/me` on mount to verify session.

### API Base URL

Both client and admin point to `https://nb.uitc.uz/api` in production (`src/lib/config.js`). Local dev URLs (`http://localhost:5000/api`) are commented out in those config files.

## Key Environment Variables (server)

- `MONGODB_URI` — MongoDB connection string
- `JWTSECRETKEY` — JWT signing secret
- `PORT` — Server port (default 3000)
