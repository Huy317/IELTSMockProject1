import type { Test } from "../types/Test";
import { client } from "./authService";

export async function getTests(): Promise<Test[]> {
  const res = await client.get<Test[]>("/Test");
  return res.data;
}

export async function deleteTest(id: string | number): Promise<void> {
  await client.delete(`/Test/${id}`);
}

export async function getAllAuthorNames(): Promise<string[]> {
  const res = await client.get<string[]>("/Test/authornames");
  return res.data;
}

export async function getFilteredTests(filters : {
  skillName? : string;
  instructorName? : string;
}) : Promise<Test[]> {
  const params = new URLSearchParams();
  if(filters.skillName) params.append("skillName", filters.skillName);
  if(filters.instructorName) params.append("instructorName", filters.instructorName);
  const res = await client.get<Test[]>(`/Test/filter?${params.toString()}`);
  return res.data;
}