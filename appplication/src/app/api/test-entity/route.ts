import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { TestEntityRepository } from "@/repositories";
import { CreateTestEntityUseCase, UseCaseError } from "@/use-cases";
import { toTestEntityResponse } from "@/entities";

/**
 * Zod schema for validating the POST request body
 */
const createTestEntitySchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(1, "Name cannot be empty")
    .max(255, "Name must be at most 255 characters"),
  status: z
    .enum(["active", "inactive", "pending"], {
      message: "Status must be one of: active, inactive, pending",
    })
    .optional()
    .default("active"),
});

/**
 * POST /api/test-entity
 *
 * Creates a new TestEntity.
 *
 * Request Body:
 * - name: string (required, 1-255 characters)
 * - status: "active" | "inactive" | "pending" (optional, defaults to "active")
 *
 * Response:
 * - 201: Created - Returns the created TestEntity
 * - 400: Bad Request - Invalid input data
 * - 500: Internal Server Error - Unexpected error
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();

    const validationResult = createTestEntitySchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { name, status } = validationResult.data;

    // Instantiate dependencies (Dependency Injection)
    const repository = new TestEntityRepository();
    const useCase = new CreateTestEntityUseCase(repository);

    // Execute the use case
    const entity = await useCase.execute({ name, status });

    // Return the created entity
    return NextResponse.json(toTestEntityResponse(entity), { status: 201 });
  } catch (error) {
    // Handle business logic errors
    if (error instanceof UseCaseError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Log unexpected errors
    console.error("Unexpected error in POST /api/test-entity:", error);

    // Return generic error for unexpected cases
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/test-entity
 *
 * Lists all TestEntities.
 *
 * Response:
 * - 200: OK - Returns an array of TestEntities
 * - 500: Internal Server Error - Unexpected error
 */
export async function GET() {
  try {
    const repository = new TestEntityRepository();
    const entities = await repository.findAll();

    return NextResponse.json({
      data: entities.map(toTestEntityResponse),
      count: entities.length,
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/test-entity:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
