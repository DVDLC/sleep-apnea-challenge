import { AuthService } from "@/service/index.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import {
  MainRouter,
  MethodsE,
  ResponseI,
} from "@common/interfaces/main_router.ts";
import { Logger } from "@common/utils/logger.ts";

export class AuthRouter extends MainRouter {
  authService: AuthService;
  constructor(
    request: Request,
    logger: Logger,
    authService: AuthService,
  ) {
    super(request, logger);
    this.authService = authService;
  }

  async route(): Promise<ResponseI<Record<string, unknown>>> {
    if (this.method === MethodsE.POST && this.url.includes("/login")) {
      const requestBody = await this.request.json();
      return await this.authService.login(requestBody);
    }

    return {
      data: { error: "Not Found" },
      status_code: HttpStatus.NOT_FOUND,
    };
  }
}
