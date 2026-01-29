/**
 * User Domain Entity
 *
 * Represents the User model used throughout the application.
 * This interface defines the shape of the data returned from the database.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  thumb: string | null;
  createdAt: Date;
}

/**
 * Input DTO for creating a new User
 */
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  thumb?: string | null;
}

/**
 * Output DTO for User operations (without sensitive data)
 */
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  thumb: string | null;
  createdAt: string;
}

/**
 * Transforms a User to a response DTO (without password)
 */
export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    thumb: user.thumb,
    createdAt: user.createdAt.toISOString(),
  };
}
