export interface Organization {
  id: string
  name: string
  document?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateOrganizationData {
  name: string
  document?: string
}

export interface UpdateOrganizationData {
  name?: string
  document?: string
}
