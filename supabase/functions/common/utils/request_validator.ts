import { HttpStatus } from "../config/http_status.ts";
import { z } from "../deps.ts";
import { CustomException } from "../utils/custom_exceptions.ts";

export function requestValidator(schema: z.ZodSchema<unknown>) {
    return function (
        _target: unknown,
        _propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            const [request, ...rest] = args;

            const parsed = await schema.safeParseAsync(request);

            if (!parsed.success) {
                throw new CustomException(
                    "on error - validation failed",
                    HttpStatus.BAD_REQUEST,
                    parsed.error.format(),
                );
            }
            args[0] = parsed.data;

            return await originalMethod.apply(this, args);
        };
    };
}
