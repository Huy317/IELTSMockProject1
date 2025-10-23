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

export async function countSubmissionByCondition(start : Date, condition : string) : Promise<number> {
    const res = await client.get<number>(`Submission/countsubmissionbycondition?start=${start.toISOString()}&condition=${condition}`);
    return res.data;
}

export async function getMostPopularTest(adminId : number | string) : Promise<string> {
    const res = await client.get<string>(`Submission/findmostpopulartest?adminID=${adminId}`);
    return res.data;
}