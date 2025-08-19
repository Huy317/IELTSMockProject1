import axios from "axios";
import type { Test } from "../types/Test";

const API_BASE = import.meta.env.VITE_API_BASE as string;

const client = axios.create({
  baseURL: `${API_BASE}/api`,
});

export async function getTests(): Promise<Test[]> {
  const res = await client.get<Test[]>("/Test");
  return res.data;
}
