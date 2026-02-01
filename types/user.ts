export interface User {
  id: string
  email: string
  name?: string | null
  password: string
  organizationId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  password: string
  name?: string
  organizationId?: string
}

export interface UpdateUserData {
  name?: string
  organizationId?: string
}
