import { Settings as ApiSettings } from "@/common/constants.ts";
import { PatientsRouter } from "@/router/api_router.ts";
import { PatientService } from "@/service/index.ts";
import { Logger } from "@common/utils/logger.ts";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const logger = new Logger();
  const apiSettings = new ApiSettings();
  const patientService = new PatientService();

  const apiRouter = new PatientsRouter(req, patientService, logger);

  const { data, status_code } = await apiRouter.route();

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" }, status: status_code },
  );
});
