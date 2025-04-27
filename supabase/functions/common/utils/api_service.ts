import { HttpStatus } from "../config/http_status.ts";
import { CustomException } from "./custom_exceptions.ts";

export class ApiService {
    private baseUrl: string;
    private headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get<T>(
        path: string,
        queryParams?: Record<string, string>,
        headers?: Record<string, string>,
    ) {
        const url = new URL(`${this.baseUrl}${path}`);

        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: headers || this.headers,
        });

        return this.handleResponse<T>(response);
    }

    public async post<T>(
        path: string,
        body: unknown,
        headers?: Record<string, string>,
    ) {
        const url = new URL(`${this.baseUrl}${path}`);

        const response = await fetch(url.toString(), {
            method: "POST",
            headers: headers || this.headers,
            body: JSON.stringify(body),
        });

        return this.handleResponse<T>(response);
    }

    private async handleResponse<T>(
        response: Response,
    ): Promise<T> {
        if (!response.ok) {
            const errorBody = await response.json();

            if (errorBody.body === "Not found") {
                throw new CustomException(
                    "on error - resource not found",
                    HttpStatus.NOT_FOUND,
                );
            }

            throw new CustomException(
                "on error - external API failed",
                HttpStatus.BAD_GATEWAY,
            );
        }
        const data = await response.json();
        return data as T;
    }
}
