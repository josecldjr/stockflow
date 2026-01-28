# StockFlow - Next.js Application

A Next.js application with a **Layered Architecture** (Pragmatic Clean Architecture) using Prisma ORM and Supabase.

## Architecture Overview

This project follows a layered architecture pattern:

```
Route (Controller) -> UseCase (Business Logic) -> Repository (Data Access)
```

### Folder Structure

```
src/
├── app/
│   └── api/
│       ├── health/          # Health check endpoint
│       └── test-entity/     # TestEntity CRUD endpoints
├── entities/                # Domain entities and DTOs
├── lib/
│   └── prisma.ts           # Prisma Client singleton
├── repositories/           # Data access layer (Prisma calls)
└── use-cases/              # Business logic layer
```

### Architecture Rules

1. **Repositories:** Handle *only* database operations (Prisma calls). Return domain entities or DTOs.
2. **Use Cases:** Handle *only* business logic. Receive repositories as dependencies (Dependency Injection).
3. **Services:** For external API calls (Stripe, SendGrid, etc.) - use Service pattern.
4. **Routes (Next.js):** Handle HTTP Requests/Responses, validate input with Zod, instantiate UseCases, return JSON.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (or any PostgreSQL database)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
# Connection pooling URL (for serverless/edge functions)
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection URL (for migrations)
DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Health Check

**GET** `/api/health`

Verifies application and database connectivity.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": {
    "connected": true,
    "latencyMs": 15
  },
  "version": "1.0.0"
}
```

**Response (500 Service Unavailable):**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": {
    "connected": false,
    "error": "Connection refused"
  },
  "version": "1.0.0"
}
```

### Test Entity

**POST** `/api/test-entity`

Creates a new TestEntity.

**Request Body:**
```json
{
  "name": "My Test Entity",
  "status": "active"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Test Entity",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**GET** `/api/test-entity`

Lists all TestEntities.

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "My Test Entity",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

## Deployment

### Vercel

This project is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
3. Deploy!

### Database Migrations on Vercel

For production migrations, use Prisma Migrate:

```bash
npx prisma migrate deploy
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma Client
- `npx prisma migrate dev` - Run migrations (development)
- `npx prisma migrate deploy` - Run migrations (production)
- `npx prisma studio` - Open Prisma Studio GUI

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Validation:** Zod
- **Styling:** Tailwind CSS
