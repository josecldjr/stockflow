import { User, CreateUserData, UpdateUserData } from '@/types'
import { Organization, CreateOrganizationData, UpdateOrganizationData } from '@/types'

export interface IUserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUserData): Promise<User>
  update(id: string, data: UpdateUserData): Promise<User | null>
  delete(id: string): Promise<boolean>
}

export interface IOrganizationRepository {
  findAll(): Promise<Organization[]>
  findById(id: string): Promise<Organization | null>
  findByName(name: string): Promise<Organization | null>
  findByDocument(document: string): Promise<Organization | null>
  create(data: CreateOrganizationData): Promise<Organization>
  update(id: string, data: UpdateOrganizationData): Promise<Organization | null>
  delete(id: string): Promise<boolean>
}
