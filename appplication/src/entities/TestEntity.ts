/**
 * TestEntity Domain Entity
 *
 * Represents the TestEntity model used throughout the application.
 * This interface defines the shape of the data returned from the database.
 */
export interface TestEntity {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
}

/**
 * Input DTO for creating a new TestEntity
 */
export interface CreateTestEntityInput {
  name: string;
  status?: string;
}

/**
 * Output DTO for TestEntity operations
 */
export interface TestEntityResponse {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

/**
 * Transforms a TestEntity to a response DTO
 */
export function toTestEntityResponse(entity: TestEntity): TestEntityResponse {
  return {
    id: entity.id,
    name: entity.name,
    status: entity.status,
    createdAt: entity.createdAt.toISOString(),
  };
}
