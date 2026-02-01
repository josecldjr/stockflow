import { User, CreateUserData } from '@/types'
import { IUserRepository } from '@/repositories/interfaces'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserData): Promise<User> {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format')
    }

    // Validate password
    if (!data.password || data.password.length < 6) {
      throw new Error('Password must be at least 6 characters long')
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    return await this.userRepository.create(data)
  }
}
