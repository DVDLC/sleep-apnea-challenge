import { HttpStatus } from "../config/http_status.ts";
import { ResponseI } from "../interfaces/main_router.ts";

export class CustomException extends Error {
    public statusCode: HttpStatus;
    public data?: Record<string, unknown>;

    constructor(
        message: string,
        statusCode: HttpStatus,
        data?: Record<string, unknown>,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }

    toResponse(): ResponseI<Record<string, unknown>> {
        const response: ResponseI<Record<string, unknown>> = {
            data: { message: this.message },
            status_code: this.statusCode,
        };

        if (this.data) {
            response.data.details = this.data;
        }

        return response;
    }
}
