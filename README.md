This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database Setup

This project uses **Prisma** with **PostgreSQL** for database management.

### Prerequisites

- Docker and Docker Compose
- Node.js and pnpm

### Database Setup

1. **Start PostgreSQL with Docker Compose:**
   ```bash
   docker compose up -d
   ```

2. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

### Environment Variables

The project uses the following environment variables (configured in `.env`):

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `NEXTAUTH_URL`: Base URL for the application

## Architecture

This project follows Clean Architecture principles with the following structure:

### 📁 **types/** - Domain entities and interfaces
- `user.ts` - User entity and data transfer objects
- `organization.ts` - Organization entity and data transfer objects

### 📁 **repositories/** - Data access layer
- `interfaces.ts` - Repository contracts
- `prisma/` - Concrete implementations using Prisma ORM
  - `user-repository.ts` - User data operations
  - `organization-repository.ts` - Organization data operations

### 📁 **use-cases/** - Business logic layer
- `users/` - User-related business operations
  - `create-user.ts` - User creation logic
  - `get-users.ts` - User listing logic

### 📁 **container/** - Dependency injection
- `index.ts` - Application container with instantiated services

### 📁 **lib/** - Infrastructure utilities
- `prisma.ts` - Database connection and Prisma client setup

### 📁 **app/api/** - API routes (Presentation layer)
- Uses use cases for business logic, keeping controllers thin

### Prisma Studio

To view and edit your database data:

```bash
npx prisma studio
```

This will open a web interface at `http://localhost:5555`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
