import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Health check response type
 */
interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  database: {
    connected: boolean;
    latencyMs?: number;
    error?: string;
  };
  version: string;
}

/**
 * GET /api/health
 *
 * Health check endpoint that verifies the application and database connection.
 *
 * This endpoint performs a REAL database query to verify connectivity,
 * not just a static JSON response.
 *
 * Response:
 * - 200: OK - Application and database are healthy
 * - 500: Service Unavailable - Database connection failed
 */
export async function GET() {
  const startTime = Date.now();

  const response: HealthCheckResponse = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: {
      connected: false,
    },
    version: process.env.npm_package_version ?? "1.0.0",
  };

  try {
    // Perform a real database query to verify connection
    await prisma.$queryRaw`SELECT 1`;

    const latencyMs = Date.now() - startTime;

    response.database = {
      connected: true,
      latencyMs,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const latencyMs = Date.now() - startTime;

    response.status = "unhealthy";
    response.database = {
      connected: false,
      latencyMs,
      error:
        error instanceof Error
          ? error.message
          : "Unknown database connection error",
    };

    console.error("Health check failed - Database connection error:", error);

    return NextResponse.json(response, { status: 500 });
  }
}
