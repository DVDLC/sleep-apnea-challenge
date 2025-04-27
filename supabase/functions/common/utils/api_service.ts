export class ApiService {
    private baseUrl: string;
    private headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get(
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

        console.log("Response", response);

        return this.handleResponse(response);
    }

    public async post(
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

        return this.handleResponse(response);
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    }
}
