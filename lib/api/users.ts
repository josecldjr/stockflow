import { api, apiEndpoints } from '../api';
import type { User, CreateUserData, UpdateUserData } from '@/types/user';

export const usersApi = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    return api.get<User[]>(apiEndpoints.users.list);
  },

  /**
   * Get a user by ID
   */
  getById: async (id: string): Promise<User> => {
    return api.get<User>(apiEndpoints.users.get(id));
  },

  /**
   * Create a new user
   */
  create: async (data: CreateUserData): Promise<User> => {
    return api.post<User>(apiEndpoints.users.create, data);
  },

  /**
   * Update a user
   */
  update: async (id: string, data: UpdateUserData): Promise<User> => {
    return api.put<User>(apiEndpoints.users.update(id), data);
  },

  /**
   * Delete a user
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(apiEndpoints.users.delete(id));
  },
};

