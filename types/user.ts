export interface User {
  id: string
  email: string
  name?: string | null
  organizationId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  name?: string
  organizationId?: string
}

export interface UpdateUserData {
  name?: string
  organizationId?: string
}
