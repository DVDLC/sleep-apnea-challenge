import type { RequestBodyLoginType } from "@/schemas/index.ts";
import { RequestBodyLoginSchema } from "@/schemas/index.ts";
import { supabase } from "@common/config/database/supabase_client.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import { ResponseI } from "@common/interfaces/main_router.ts";
import { CustomException } from "@common/utils/custom_exceptions.ts";
import { requestValidator } from "@common/utils/request_validator.ts";
import { serviceErrorHandler } from "@common/utils/service_error_handler.ts";

interface AuthServiceI {
  login(
    requestBody: RequestBodyLoginType,
  ): Promise<ResponseI<Record<string, unknown>>>;
}

export class AuthService implements AuthServiceI {
  @serviceErrorHandler
  @requestValidator(RequestBodyLoginSchema)
  async login(
    requestBody: RequestBodyLoginType,
  ): Promise<ResponseI<Record<string, unknown>>> {
    const authResponse = await supabase.auth.signInWithPassword(requestBody);

    if (!authResponse.data.user) {
      throw new CustomException(
        "on error - user not found",
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      data: {
        session: {
          access_token: authResponse.data.session.access_token,
        },
      },
      status_code: HttpStatus.OK,
    };
  }
}
