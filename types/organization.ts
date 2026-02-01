export interface Organization {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrganizationData {
  name: string
}

export interface UpdateOrganizationData {
  name?: string
}
