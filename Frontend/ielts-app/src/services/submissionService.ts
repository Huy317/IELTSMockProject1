import type { Submission, SubmitRequest, SubmitResponse, ViewSubmissionDTO } from "../types/Submission";
import { client } from "./authService";

export async function GetRecentlySubmissionById(userId : number | string) : Promise<ViewSubmissionDTO[]> {
    const res = await client.get<ViewSubmissionDTO[]>(`/Submission/getrecentlysubmit/?studentId=${userId}`);
    return res.data;
}

export async function SubmitTest(request : SubmitRequest) : Promise<SubmitResponse> {
    const res = await client.post<SubmitResponse>("/Submission/submit", request);
    return res.data;
}

export async function getSubmissionById(submissionId:string) : Promise<Submission> {
    const res = await client.get<Submission>(`/Submission/${submissionId}`);
    return res.data;
}