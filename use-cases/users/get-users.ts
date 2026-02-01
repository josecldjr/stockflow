import { User } from '@/types'
import { IUserRepository } from '@/repositories/interfaces'

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll()
  }
}
