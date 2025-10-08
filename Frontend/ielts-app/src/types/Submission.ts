export interface ViewSubmissionDTO {
    id : number;
    instructorName : string;
    score : number;
    testName : string;
    typeName : string;
}

export interface SubmitResponse {
    userId : number | string;
    testId : number | string;
    submittedAt : string;
    score : number;
    correct: number;
    incorrect: number;
}

export interface SubmitRequest {
    userId : number | string;
    testId : number | string;
    userAnswerMap : Record<number, string>;
}