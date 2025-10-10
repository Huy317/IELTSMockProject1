export interface SubmissionDetail {
    id : number;
    submissionId : number;
    feedback : string;
    answer: string; // json string, will need to parse
}