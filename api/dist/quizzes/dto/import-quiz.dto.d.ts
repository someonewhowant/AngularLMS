export declare enum ImportFormat {
    MARKDOWN = "markdown",
    GIFT = "gift"
}
export declare class ImportQuizDto {
    moduleId: number;
    format: ImportFormat;
    title?: string;
    content?: string;
}
export declare class ImportQuestionsDto {
    format: ImportFormat;
    content?: string;
}
