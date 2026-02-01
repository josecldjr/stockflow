import { api, apiEndpoints } from '../api';
import type {
  Organization,
  CreateOrganizationData,
  UpdateOrganizationData,
} from '@/types/organization';

export const organizationsApi = {
  /**
   * Get all organizations
   */
  getAll: async (): Promise<Organization[]> => {
    return api.get<Organization[]>(apiEndpoints.organizations.list);
  },

  /**
   * Get an organization by ID
   */
  getById: async (id: string): Promise<Organization> => {
    return api.get<Organization>(apiEndpoints.organizations.get(id));
  },

  /**
   * Create a new organization
   */
  create: async (data: CreateOrganizationData): Promise<Organization> => {
    return api.post<Organization>(apiEndpoints.organizations.create, data);
  },

  /**
   * Update an organization
   */
  update: async (id: string, data: UpdateOrganizationData): Promise<Organization> => {
    return api.put<Organization>(apiEndpoints.organizations.update(id), data);
  },

  /**
   * Delete an organization
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(apiEndpoints.organizations.delete(id));
  },
};

