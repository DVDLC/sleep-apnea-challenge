import { AuthRouter } from "@/router/index.ts";
import { AuthService } from "@/service/index.ts";
import { Logger } from "@common/utils/logger.ts";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const logger = new Logger();
  const authService = new AuthService();
  const apiRouter = new AuthRouter(req, logger, authService);

  const { data, status_code } = await apiRouter.route();

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" }, status: status_code },
  );
});
