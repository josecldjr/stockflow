import { prisma } from '@/lib/prisma'
import { UserRepository, OrganizationRepository } from '@/repositories/prisma'
import { CreateUserUseCase, GetUsersUseCase } from '@/use-cases/users'

// Repositories
const userRepository = new UserRepository(prisma)
const organizationRepository = new OrganizationRepository(prisma)

// Use Cases
const createUserUseCase = new CreateUserUseCase(userRepository)
const getUsersUseCase = new GetUsersUseCase(userRepository)

// Export instances
export {
  userRepository,
  organizationRepository,
  createUserUseCase,
  getUsersUseCase
}
