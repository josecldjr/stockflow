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

  async findByDocument(document: string): Promise<Organization | null> {
    return await this.prisma.organization.findUnique({
      where: { document }
    })
  }

  async create(data: CreateOrganizationData): Promise<Organization> {
    return await this.prisma.organization.create({
      data: {
        name: data.name,
        document: data.document
      }
    })
  }

  async update(id: string, data: UpdateOrganizationData): Promise<Organization | null> {
    try {
      const updateData: { name?: string; document?: string | null } = {}
      
      if (data.name !== undefined) {
        updateData.name = data.name
      }
      
      if (data.document !== undefined) {
        updateData.document = data.document || null
      }

      return await this.prisma.organization.update({
        where: { id },
        data: updateData
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
