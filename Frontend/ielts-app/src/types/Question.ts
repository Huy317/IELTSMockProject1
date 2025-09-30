// same as Full Detail
export interface Question {
    id: number;
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    parentId: number;
    testId: number;
    order: number;
    link: string;
}

export interface QuestionGetReturn {
    id: number;
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    testId: number;
    order: number;
}

export interface QuestionParagraphReturn {
    id: number;
    content: string;
    testId: number;
}

export interface QuestionToCreate {
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    parentId: number;
    testId: number;
    link: string;
    order: number;
}

// Should be the same as Question
export interface QuestionPostReturn {
    id: number;
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    parentId: number;
    testId: number;
    order: number;
    link: string;
}

export interface QuestionToUpdate {
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    link: string;
    parentId: number;
    order: number;
}

export interface QuestionPutReturn {
    id: number;
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    testId: number;
    order: number;
}

// Same as Question, has all fields
export interface QuestionFullDetail {
    id: number;
    questionType: string;
    content: string;
    correctAnswer: string;
    choices: string;
    explanation: string;
    testId: number;
    order: number;
    parentId: number;
    link: string;
}