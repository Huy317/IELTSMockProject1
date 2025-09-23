import type { ViewSubmissionDTO } from "../types/Submission";
import { client } from "./authService";

export async function GetRecentlySubmissionById(userId : number | string) : Promise<ViewSubmissionDTO[]> {
    const res = await client.get<ViewSubmissionDTO[]>(`/Submission/getrecentlysubmit/?studentId=${userId}`);
    return res.data;
}