import { Organization, CreateOrganizationData } from '@/types'
import { IOrganizationRepository } from '@/repositories/interfaces'

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async execute(data: CreateOrganizationData): Promise<Organization> {
    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Organization name is required')
    }

    // Check if organization with same name already exists
    const existingOrganizationByName = await this.organizationRepository.findByName(data.name)
    if (existingOrganizationByName) {
      throw new Error('Organization with this name already exists')
    }

    // Check if organization with same document already exists (if document is provided)
    if (data.document) {
      const existingOrganizationByDocument = await this.organizationRepository.findByDocument(data.document)
      if (existingOrganizationByDocument) {
        throw new Error('Organization with this document already exists')
      }
    }

    return await this.organizationRepository.create(data)
  }
}

