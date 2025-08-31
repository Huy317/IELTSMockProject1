import axios from "axios";
import type { User } from "../types/User";

const API_BASE = import.meta.env.VITE_API_BASE as string;

const client = axios.create({
  baseURL: `${API_BASE}/api`,
});

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

