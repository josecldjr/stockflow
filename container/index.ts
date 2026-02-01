import { prisma } from '@/lib/prisma'
import { UserRepository, OrganizationRepository } from '@/repositories/prisma'
import { CreateUserUseCase, GetUsersUseCase } from '@/use-cases/users'
import { CreateOrganizationUseCase } from '@/use-cases/organizations'

// Repositories
const userRepository = new UserRepository(prisma)
const organizationRepository = new OrganizationRepository(prisma)

// Use Cases
const createUserUseCase = new CreateUserUseCase(userRepository)
const getUsersUseCase = new GetUsersUseCase(userRepository)
const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepository)

// Export instances
export {
  userRepository,
  organizationRepository,
  createUserUseCase,
  getUsersUseCase,
  createOrganizationUseCase
}
