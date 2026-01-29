import bcrypt from "bcryptjs";
import type { UserRepository } from "../repositories";
import type { UserResponse, CreateUserDTO } from "../entities";
import { toUserResponse } from "../entities";

/**
 * Business logic error for use case operations
 */
export class UseCaseError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = "UseCaseError";
  }
}

/**
 * Input DTO for user registration
 */
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  thumb?: string | null;
}

/**
 * RegisterUserUseCase
 *
 * Handles the business logic for registering a new User.
 * This layer is responsible ONLY for business rules - no HTTP or database concerns.
 *
 * Uses Dependency Injection pattern - receives repository as a constructor parameter.
 */
export class RegisterUserUseCase {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly repository: UserRepository) {}

  /**
   * Executes the use case to register a new User
   *
   * Business Rules:
   * - Email must be unique (not already in use)
   * - Password must be hashed before storing
   * - Name must be valid (non-empty, trimmed)
   * - Email must be valid format
   *
   * @param input - The input data for registering a User
   * @returns The created User (without password)
   * @throws UseCaseError if validation fails or email already exists
   */
  async execute(input: RegisterUserInput): Promise<UserResponse> {
    // Validate name
    const trimmedName = input.name?.trim();

    if (!trimmedName) {
      throw new UseCaseError(
        "Name is required and cannot be empty",
        "INVALID_NAME"
      );
    }

    if (trimmedName.length < 2 || trimmedName.length > 255) {
      throw new UseCaseError(
        "Name must be between 2 and 255 characters",
        "INVALID_NAME_LENGTH"
      );
    }

    // Validate email format
    const trimmedEmail = input.email?.trim().toLowerCase();

    if (!trimmedEmail) {
      throw new UseCaseError(
        "Email is required and cannot be empty",
        "INVALID_EMAIL"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new UseCaseError("Invalid email format", "INVALID_EMAIL_FORMAT");
    }

    // Validate password
    if (!input.password) {
      throw new UseCaseError(
        "Password is required and cannot be empty",
        "INVALID_PASSWORD"
      );
    }

    if (input.password.length < 6) {
      throw new UseCaseError(
        "Password must be at least 6 characters long",
        "INVALID_PASSWORD_LENGTH"
      );
    }

    // Check if email is already in use
    const existingUser = await this.repository.findByEmail(trimmedEmail);

    if (existingUser) {
      throw new UseCaseError("Email is already in use", "EMAIL_ALREADY_EXISTS");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(input.password, this.SALT_ROUNDS);

    // Create user data
    const createData: CreateUserDTO = {
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      thumb: input.thumb ?? null,
    };

    // Create the user through the repository
    const user = await this.repository.create(createData);

    // Return user without password
    return toUserResponse(user);
  }
}
