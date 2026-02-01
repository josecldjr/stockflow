import { PrismaClient } from '@prisma/client'
import { Organization, CreateOrganizationData, UpdateOrganizationData } from '@/types'
import { IOrganizationRepository } from '../interfaces'

export class OrganizationRepository implements IOrganizationRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Organization[]> {
    return await this.prisma.organization.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async findById(id: string): Promise<Organization | null> {
    return await this.prisma.organization.findUnique({
      where: { id }
    })
  }

  async findByName(name: string): Promise<Organization | null> {
    return await this.prisma.organization.findFirst({
      where: { name }
    })
  }

  async create(data: CreateOrganizationData): Promise<Organization> {
    return await this.prisma.organization.create({
      data: {
        name: data.name
      }
    })
  }

  async update(id: string, data: UpdateOrganizationData): Promise<Organization | null> {
    try {
      return await this.prisma.organization.update({
        where: { id },
        data: {
          name: data.name
        }
      })
    } catch {
      return null
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.organization.delete({
        where: { id }
      })
      return true
    } catch {
      return false
    }
  }
}
