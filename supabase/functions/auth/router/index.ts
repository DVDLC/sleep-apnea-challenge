import { HttpStatus } from "@common/config/http_status.ts";
import {
  MainRouter,
  MethodsE,
  ResponseI,
} from "@common/interfaces/main_router.ts";
import { Logger } from "@common/utils/logger.ts";

export class AuthRouter extends MainRouter {
  constructor(
    request: Request,
    logger: Logger,
  ) {
    super(request, logger);
  }

  async route(): Promise<ResponseI<Record<string, unknown>>> {
    if (this.method === MethodsE.POST && this.url.includes("/login")) {
      return {
        data: { msg: "Hola mundo desde auth" },
        status_code: 200,
      };
    }

    return {
      data: { error: "Not Found" },
      status_code: HttpStatus.NOT_FOUND,
    };
  }
}
