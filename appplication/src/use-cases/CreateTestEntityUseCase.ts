import type { TestEntityRepository } from "@/repositories";
import type { TestEntity, CreateTestEntityInput } from "@/entities";

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
 * CreateTestEntityUseCase
 *
 * Handles the business logic for creating a new TestEntity.
 * This layer is responsible ONLY for business rules - no HTTP or database concerns.
 *
 * Uses Dependency Injection pattern - receives repository as a constructor parameter.
 */
export class CreateTestEntityUseCase {
  constructor(private readonly repository: TestEntityRepository) {}

  /**
   * Executes the use case to create a new TestEntity
   *
   * Business Rules:
   * - Name must be valid (non-empty, trimmed, between 1-255 characters)
   * - Name must be unique (optional, can be enabled if needed)
   *
   * @param input - The input data for creating a TestEntity
   * @returns The created TestEntity
   * @throws UseCaseError if validation fails
   */
  async execute(input: CreateTestEntityInput): Promise<TestEntity> {
    // Validate name
    const trimmedName = input.name?.trim();

    if (!trimmedName) {
      throw new UseCaseError(
        "Name is required and cannot be empty",
        "INVALID_NAME"
      );
    }

    if (trimmedName.length < 1 || trimmedName.length > 255) {
      throw new UseCaseError(
        "Name must be between 1 and 255 characters",
        "INVALID_NAME_LENGTH"
      );
    }

    // Validate status if provided
    const validStatuses = ["active", "inactive", "pending"];
    const status = input.status?.trim() ?? "active";

    if (!validStatuses.includes(status)) {
      throw new UseCaseError(
        `Status must be one of: ${validStatuses.join(", ")}`,
        "INVALID_STATUS"
      );
    }

    // Create the entity through the repository
    const entity = await this.repository.create({
      name: trimmedName,
      status,
    });

    return entity;
  }
}
