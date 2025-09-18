import type { Test, TestWithAuthorName } from "../types/Test";
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

// export async function getFilteredTests(filters : {
//   skillName? : string;
//   instructorName? : string;
// }) : Promise<Test[]> {
//   const params = new URLSearchParams();
//   if(filters.skillName) params.append("skillName", filters.skillName);
//   if(filters.instructorName) params.append("instructorName", filters.instructorName);
//   const res = await client.get<Test[]>(`/Test/filter?${params.toString()}`);
//   return res.data;
// }

export async function getFilteredTests(filters : {
  skillName? : string[];
  instructorName? : string[];
  search? : string;
  sort? :string;
}) : Promise<TestWithAuthorName[]> {
  const params = new URLSearchParams();
  if (filters.skillName) {
    filters.skillName.forEach(skill => params.append("skillName", skill));
  }
  if (filters.instructorName) {
    filters.instructorName.forEach(instr => params.append("instructorName", instr));
  }
  if (filters.sort) {
    params.append("sort", filters.sort);
  }
  if (filters.search) {
    params.append("search", filters.search);
  }
  
  const res = await client.get<TestWithAuthorName[]>(`/Test/filter?${params.toString()}`);
  return res.data;
}