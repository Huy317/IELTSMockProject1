import type { User } from "../types/User";
import { client } from "./authService"; // Use the authenticated client

interface UserCreateDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string | null; // Allow null for optional phone number
  role: string;
}
interface UserBasicDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}
interface UserUpdateDto {
  fullName: string;
  email: string;
  password?: string; // Make password optional
  phoneNumber?: string;
}

export async function getAllUsers(): Promise<User[]> {
  const res = await client.get<User[]>("/Users");
  return res.data;
}

export async function deleteUser(id: string | number): Promise<void> {
  await client.delete(`/Users/${id}`);
}

// Create a new user
export async function createUser(
  newUser: UserCreateDTO
): Promise<UserBasicDto> {
  const res = await client.post<UserBasicDto>("/Users", newUser);
  return res.data;
}

// Update an existing user
export async function updateUser(
  id: string | number,
  userUpdate: UserUpdateDto
): Promise<UserBasicDto> {
  const res = await client.put<UserBasicDto>(`/Users/${id}`, userUpdate);
  return res.data;
}

// Get a single user by ID
export async function getUserById(id: string | number): Promise<User> {
  const res = await client.get<User>(`/Users/${id}`);
  return res.data;
}

