import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { UserRepository } from "@/modules/auth/repositories";
import { RegisterUserUseCase, UseCaseError } from "@/modules/auth/use-cases";

/**
 * Zod schema for validating the POST request body
 */
const registerUserSchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be at most 255 characters"),
  email: z
    .string({ message: "Email must be a string" })
    .email("Invalid email format"),
  password: z
    .string({ message: "Password must be a string" })
    .min(6, "Password must be at least 6 characters"),
  thumb: z.string().url("Thumb must be a valid URL").optional().nullable(),
});

/**
 * POST /api/auth/register
 *
 * Registers a new User.
 *
 * Request Body:
 * - name: string (required, 2-255 characters)
 * - email: string (required, valid email format)
 * - password: string (required, min 6 characters)
 * - thumb: string? (optional, valid URL for profile picture)
 *
 * Response:
 * - 201: Created - Returns the created User (without password)
 * - 400: Bad Request - Invalid input data
 * - 409: Conflict - Email already in use
 * - 500: Internal Server Error - Unexpected error
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();

    const validationResult = registerUserSchema.safeParse(body);

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

    const { name, email, password, thumb } = validationResult.data;

    // Instantiate dependencies (Dependency Injection)
    const repository = new UserRepository();
    const useCase = new RegisterUserUseCase(repository);

    // Execute the use case
    const user = await useCase.execute({ name, email, password, thumb });

    // Return the created user (without password)
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Handle business logic errors
    if (error instanceof UseCaseError) {
      // Return 409 Conflict for duplicate email
      if (error.code === "EMAIL_ALREADY_EXISTS") {
        return NextResponse.json(
          {
            error: error.message,
            code: error.code,
          },
          { status: 409 }
        );
      }

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
    console.error("Unexpected error in POST /api/auth/register:", error);

    // Return generic error for unexpected cases
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
