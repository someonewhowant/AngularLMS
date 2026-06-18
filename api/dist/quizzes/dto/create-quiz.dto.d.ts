export declare class CreateQuestionOptionDto {
    text: string;
    isCorrect: boolean;
}
export declare class CreateQuestionDto {
    text: string;
    options: CreateQuestionOptionDto[];
}
export declare class CreateQuizDto {
    title: string;
    description?: string;
    moduleId: number;
    questions: CreateQuestionDto[];
}
