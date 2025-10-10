import type { SubmissionDetail } from "../types/SubmissionDetail";
import { client } from "./authService";

export async function getSubmissionDetailById(submissionId: number) : Promise<SubmissionDetail> {
    const res = await client.get(`/SubmissionDetail/${submissionId}`);
    return res.data;
}
