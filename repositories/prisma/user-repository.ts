import { PrismaClient } from '@prisma/client'
import { User, CreateUserData, UpdateUserData } from '@/types'
import { IUserRepository } from '../interfaces'

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email }
    })
  }

  async create(data: CreateUserData): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        organizationId: data.organizationId
      }
    })
  }

  async update(id: string, data: UpdateUserData): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: data.name,
          organizationId: data.organizationId
        }
      })
    } catch {
      return null
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id }
      })
      return true
    } catch {
      return false
    }
  }
}
