# Portfolio Server

A production-minded backend for a personal portfolio and admin dashboard. This project showcases how I build secure, scalable APIs with TypeScript, Express, PostgreSQL, Redis, JWT authentication, and transactional CRUD flows for real portfolio content.

Live API: `https://portfolio-server-m9ep.onrender.com`

## Why This Project Stands Out

This backend is more than a basic CRUD app. It demonstrates practical engineering decisions that matter in real products:

- Designing a modular Express + TypeScript codebase that is easy to maintain
- Modeling structured portfolio data with PostgreSQL and Drizzle ORM
- Securing admin-only operations with JWT-based authentication
- Reducing database load with Redis caching and cache invalidation
- Protecting public endpoints with rate limiting, Helmet, CORS, and compression
- Automating contact workflows with confirmation and notification emails
- Exposing a health check and deployment-friendly environment configuration

## Tech Stack

| Layer | Technology | Why it is used |
| --- | --- | --- |
| Runtime | Node.js | Server-side JavaScript runtime |
| Language | TypeScript | Type safety and better maintainability |
| Web Framework | Express 5 | Lightweight REST API architecture |
| Database | PostgreSQL | Reliable relational data storage |
| ORM | Drizzle ORM + Drizzle Kit | Type-safe schema management and database access |
| Cache | Redis + ioredis | Fast reads for high-traffic portfolio endpoints |
| Auth | JSON Web Tokens | Stateless admin authentication |
| Validation | express-validator | Route-level request validation rules |
| Security | Helmet, CORS, express-rate-limit | Safer production defaults and abuse protection |
| Performance | compression, morgan | Response compression and request logging |
| Email | Resend, Nodemailer | Contact confirmation and admin notifications |

## What The API Does

- Serves portfolio data for profile, education, skills, experiences, and projects
- Provides admin-only CRUD endpoints for managing portfolio content
- Accepts contact form submissions and stores them in PostgreSQL
- Sends email confirmations to visitors and notification emails to the admin
- Exposes a `/health` endpoint for monitoring
- Serves a static API documentation page from `/`

## Architecture Overview

The codebase is split by responsibility so it stays readable as the project grows:

- `src/app.ts` boots the server, middleware, and route registration
- `src/routes` defines public and admin endpoints
- `src/controllers` handles request/response logic
- `src/services` contains reusable business logic like auth and email
- `src/config` centralizes infrastructure setup for PostgreSQL, Redis, and email
- `src/models/schema.ts` defines the database schema with Drizzle
- `src/utils/cache.ts` handles cache invalidation helpers

## How I Scale This Backend

This project already includes several practical scaling patterns:

### 1. Cached Read Model For The Main Portfolio Endpoint

`GET /api/portfolio` aggregates profile, education, skills, experiences, and projects into one response. That payload is cached in Redis for 1 hour, which reduces repeated database reads for the most frequently requested endpoint.

### 2. Cache Invalidation On Admin Writes

Whenever an admin updates portfolio content, the Redis cache is cleared so the next public request receives fresh data. This gives a good balance between speed and correctness.

### 3. Stateless Authentication

Admin access uses JWTs instead of server-side sessions. That means the API can be scaled horizontally behind a load balancer without sharing session state across instances.

### 4. Abuse Protection

The app uses:

- Global rate limiting for general API protection
- Stricter rate limiting on the contact form endpoint
- Helmet for secure HTTP headers
- CORS rules for controlled cross-origin access

These choices help protect the API from basic abuse and noisy traffic.

### 5. Performance-Oriented Middleware

- `compression` reduces response payload size
- Redis reduces repeated database work
- Route separation keeps public reads and admin writes cleanly organized
- Environment-based configuration makes deployment flexible across local, staging, and production

## Main Endpoints

| Method | Route | Purpose | Access |
| --- | --- | --- | --- |
| GET | `/` | Static API documentation page | Public |
| GET | `/health` | Health check endpoint | Public |
| GET | `/api/portfolio` | Complete portfolio payload | Public |
| GET | `/api/profile` | Profile data | Public |
| GET | `/api/education` | Education records | Public |
| GET | `/api/skills` | Skill list | Public |
| GET | `/api/experiences` | Experience history | Public |
| GET | `/api/projects` | Project list | Public |
| GET | `/api/projects/:id` | Single project by ID | Public |
| POST | `/api/contact` | Submit a contact message | Public |
| POST | `/api/admin/login` | Admin login | Public |
| GET | `/api/admin/validate` | Validate JWT token | Admin |
| POST/PUT/DELETE | `/api/admin/*` | Manage profile, education, skills, experiences, projects, and contacts | Admin |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis
- A Resend API key for email delivery

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Create a `.env` file based on `.env.example` and fill in your real credentials.

### 3. Sync the database schema

```bash
npm run db:push
```

If you want to generate migration files first:

```bash
npm run db:generate
```

### 4. Start the development server

```bash
npm run dev
```

The API will run locally on `http://localhost:3001` unless you change `PORT`.

### 5. Build and start for production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No | Server port, defaults to `3001` |
| `NODE_ENV` | Yes | Environment mode |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `JWT_SECRET` | Yes | Secret used to sign admin JWTs |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `CORS_ORIGIN` | Production | Allowed frontend origins |
| `RATE_LIMIT_WINDOW_MS` | No | Global rate-limit window |
| `RATE_LIMIT_MAX_REQUESTS` | No | Max requests per rate-limit window |
| `RESEND_API_KEY` | Yes | API key for sending email |
| `FROM_NAME` | Yes | Sender display name |
| `FROM_EMAIL` | Yes | Admin notification inbox |
| `SMTP_HOST` | Optional | SMTP fallback configuration |
| `SMTP_PORT` | Optional | SMTP fallback configuration |
| `SMTP_USER` | Optional | SMTP fallback configuration |
| `SMTP_PASS` | Optional | SMTP fallback configuration |

## Project Structure

```text
src/
  app.ts
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  types/
  utils/
public/
  index.html
drizzle.config.ts
package.json
tsconfig.json
```
