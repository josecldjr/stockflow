import prisma from "@/lib/prisma";
import type { TestEntity, CreateTestEntityInput } from "@/entities";

/**
 * TestEntityRepository
 *
 * Handles all database operations for the TestEntity model.
 * This layer is responsible ONLY for data access - no business logic.
 */
export class TestEntityRepository {
  /**
   * Creates a new TestEntity in the database
   * @param data - The input data for creating a TestEntity
   * @returns The created TestEntity
   */
  async create(data: CreateTestEntityInput): Promise<TestEntity> {
    const entity = await prisma.testEntity.create({
      data: {
        name: data.name,
        status: data.status ?? "active",
      },
    });

    return entity;
  }

  /**
   * Finds a TestEntity by its ID
   * @param id - The UUID of the TestEntity
   * @returns The TestEntity if found, null otherwise
   */
  async findById(id: string): Promise<TestEntity | null> {
    const entity = await prisma.testEntity.findUnique({
      where: { id },
    });

    return entity;
  }

  /**
   * Finds a TestEntity by its name
   * @param name - The name of the TestEntity
   * @returns The TestEntity if found, null otherwise
   */
  async findByName(name: string): Promise<TestEntity | null> {
    const entity = await prisma.testEntity.findFirst({
      where: { name },
    });

    return entity;
  }

  /**
   * Lists all TestEntities
   * @returns Array of all TestEntities
   */
  async findAll(): Promise<TestEntity[]> {
    const entities = await prisma.testEntity.findMany({
      orderBy: { createdAt: "desc" },
    });

    return entities;
  }

  /**
   * Deletes a TestEntity by its ID
   * @param id - The UUID of the TestEntity to delete
   * @returns The deleted TestEntity
   */
  async delete(id: string): Promise<TestEntity> {
    const entity = await prisma.testEntity.delete({
      where: { id },
    });

    return entity;
  }
}

// Export a default instance for convenience
export const testEntityRepository = new TestEntityRepository();
