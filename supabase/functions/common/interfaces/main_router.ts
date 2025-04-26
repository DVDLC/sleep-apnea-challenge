import { HttpStatus } from "../config/http_status.ts";
import { Logger } from "../utils/logger.ts";

export enum MethodsE {
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    GET = "GET",
}

export interface ResponseI<T = unknown> {
    data: T;
    status_code: HttpStatus;
}

export interface MainRouterI {
    url: string;
    method: string;
    request: Request;
    logger: Logger;
    route(): Promise<ResponseI>;
}

export abstract class MainRouter implements MainRouterI {
    url: string;
    method: string;
    request: Request;
    logger: Logger;

    constructor(
        request: Request,
        logger: Logger,
    ) {
        this.request = request;
        this.method = request.method;
        this.url = request.url;
        this.logger = logger;
    }

    abstract route(): Promise<ResponseI>;
}
