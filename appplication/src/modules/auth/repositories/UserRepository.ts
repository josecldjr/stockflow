import prisma from "@/lib/prisma";
import type { User, CreateUserDTO } from "../entities";

/**
 * UserRepository
 *
 * Handles all database operations for the User model.
 * This layer is responsible ONLY for data access - no business logic.
 */
export class UserRepository {
  /**
   * Finds a User by their email address
   * @param email - The email address to search for
   * @returns The User if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  /**
   * Creates a new User in the database
   * @param data - The input data for creating a User
   * @returns The created User
   */
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        thumb: data.thumb ?? null,
      },
    });

    return user;
  }

  /**
   * Finds a User by their ID
   * @param id - The UUID of the User
   * @returns The User if found, null otherwise
   */
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
}

// Export a default instance for convenience
export const userRepository = new UserRepository();
