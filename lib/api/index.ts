export { api, apiEndpoints, type ApiError, type RequestOptions } from '../api-client';
export { usersApi } from './users';
export { organizationsApi } from './organizations';

// Re-export for better compatibility
export type { Organization, CreateOrganizationData, UpdateOrganizationData } from '@/types/organization';
export type { User, CreateUserData, UpdateUserData } from '@/types/user';

