import type { QuestionGetReturn, QuestionParagraphReturn, QuestionPostReturn, QuestionToCreate, QuestionToUpdate } from "../types/Question";
import { client } from "./authService";

export async function createParagraph(question : QuestionToCreate): Promise<QuestionParagraphReturn> {
    const response = await client.post('/api/Question', question);
    return response.data;
}

export async function createQuestion(question : QuestionToCreate): Promise<QuestionPostReturn> {
    const response = await client.post('/api/Question', question);
    return response.data;
}

export async function getAllQuestionsWithTestId(testId: number): Promise<QuestionPostReturn[]> {
    const response = await client.get(`/api/Question/bytestid?id=${testId}`);
    return response.data;
}

export async function getQuestion(id: number): Promise<QuestionGetReturn> {
    const response = await client.get(`/api/Question/${id}`);
    return response.data;
}

export async function deleteQuestion(id: number): Promise<void> {
    await client.delete(`/api/Question/${id}`);
}

export async function updateQuestion(id: number, question: QuestionToUpdate): Promise<QuestionPostReturn> {
    const response = await client.put(`/api/Question/${id}`, question);
    return response.data;
}

