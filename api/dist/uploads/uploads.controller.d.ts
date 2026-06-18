export declare class UploadsController {
    uploadFile(file: Express.Multer.File): {
        url: string;
        originalname: string;
        mimetype: string;
        size: number;
    };
}
