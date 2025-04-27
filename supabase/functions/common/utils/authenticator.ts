import { GuardService } from "../services/authenticator_gurad.ts";

export const authenticate = (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) => {
    const originalMethod = descriptor.value;
    const guardService: GuardService = new GuardService();
    descriptor.value = async function (...args: unknown[]) {
        const [req, ..._] = args;
        const request = req as Request;

        const authHeader = request.headers.get("Authorization") || "";
        const token = authHeader.split(" ").pop() || "";

        guardService.validateToken(token);
        return await originalMethod.apply(this, args);
    };
};
