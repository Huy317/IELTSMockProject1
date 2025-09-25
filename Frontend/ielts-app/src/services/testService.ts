import type { Test, TestWithAuthorName, TestToCreate, TestToUpdate } from "../types/Test";
import { client } from "./authService";

export async function getTests(): Promise<TestWithAuthorName[]> {
  const res = await client.get<TestWithAuthorName[]>("/Test");
  return res.data;
}

export async function getPopularTests(): Promise<TestWithAuthorName[]> {
  const res = await client.get<TestWithAuthorName[]>("/Test/populartest");
  return res.data;
}

export async function createTest(test: TestToCreate): Promise<TestWithAuthorName> {
  const res = await client.post<TestWithAuthorName>("/Test", test);
  return res.data;
}

export async function deleteTest(id: string | number): Promise<void> {
  await client.delete(`/Test/${id}`);
}

export async function getAllAuthorNames(): Promise<string[]> {
  const res = await client.get<string[]>("/Test/authornames");
  return res.data;
}

export async function getTestById(id: string | number): Promise<TestWithAuthorName> {
  const res = await client.get<TestWithAuthorName>(`/Test/${id}`);
  return res.data;
}

export async function getRecentlyTestByAdminId(id: string | number) : Promise<TestWithAuthorName[]> {
  const res = await client.get<TestWithAuthorName[]>(`/Test/recentlycreatedtestbyid?id=${id}`);
  return res.data;
}

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

export async function updateTest(id: string | number, data: TestToUpdate): Promise<TestWithAuthorName> {
  const res = await client.put<TestWithAuthorName>(`/Test/${id}`, data);
  return res.data;
}