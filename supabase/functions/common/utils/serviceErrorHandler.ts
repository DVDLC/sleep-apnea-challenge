import { HttpStatus } from "../config/http_status.ts";
import { CustomException } from "./customExceptions.ts";
import { Level, Logger } from "./logger.ts";

export const serviceErrorHandler = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) => {
    const logger = new Logger();
    logger
        .set_message("on error - server failure")
        .set_level(Level.ERROR);

    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        try {
            return await originalMethod.apply(this, args);
        } catch (error) {
            if (error instanceof CustomException) {
                logger
                    .set_message("on error - controlled error")
                    .set_meta(error)
                    .log();
                return error.toResponse();
            }

            if (error instanceof Error) {
                logger
                    .set_meta({
                        name: error.name,
                        message: error.message,
                        stack: error.stack,
                    })
                    .log();
                return new CustomException(
                    "on error - server failure",
                    HttpStatus.INTERNAL_SERVER_ERROR,
                ).toResponse();
            }
        }
    };
};
