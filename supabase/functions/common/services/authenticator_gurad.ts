import { HttpStatus } from "../config/http_status.ts";
import { decode } from "../deps.ts";
import { CustomException } from "../utils/custom_exceptions.ts";

export class GuardService {
    private async cryptoHandler(): Promise<CryptoKey> {
        const jwtSecret = "";
        return await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(jwtSecret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"],
        );
    }

    public async validateToken(token: string) {
        if (!token) {
            throw new CustomException(
                "on error - invalid authorization token",
                HttpStatus.BAD_REQUEST,
            );
        }

        // const crypt = await this.cryptoHandler();

        // await verify(token, crypt);

        const [_, payloadRaw] = decode(token);
        const payload = payloadRaw as { sub?: string; exp?: number };

        if (!payload.sub) {
            throw new CustomException(
                "on error - invalid authorization token",
                HttpStatus.BAD_REQUEST,
            );
        }

        if (payload.exp && (payload.exp * 1000) < Date.now()) {
            throw new CustomException(
                "on error - token expired",
                HttpStatus.BAD_REQUEST,
            );
        }

        return true;
    }
}
