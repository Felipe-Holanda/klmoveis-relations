export class AppError extends Error {
    public readonly message: string;
    public readonly status: number;
    constructor(message: string, status: number = 400) {
        super(message);
        this.message = message;
        this.status = status;
    }
}