import type { Test } from "../types/Test";
import { client } from "./authService";

export async function getTests(): Promise<Test[]> {
  const res = await client.get<Test[]>("/Test");
  return res.data;
}

export async function deleteTest(id: string | number): Promise<void> {
  await client.delete(`/Test/${id}`);
}
