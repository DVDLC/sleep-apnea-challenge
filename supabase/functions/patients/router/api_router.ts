import { PatientService } from "@/service/index.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import {
  MainRouter,
  MethodsE,
  ResponseI,
} from "@common/interfaces/main_router.ts";
import { Logger } from "@common/utils/logger.ts";

export class PatientsRouter extends MainRouter {
  patientService: PatientService;
  constructor(
    request: Request,
    patientService: PatientService,
    logger: Logger,
  ) {
    super(request, logger);
    this.patientService = patientService;
  }

  async route(): Promise<ResponseI<Record<string, unknown>>> {
    if (this.method === MethodsE.POST && this.url.includes("/verify")) {
      const requestBody = await this.request.json();
      return await this.patientService.verifyPatients(requestBody);
    }

    return {
      data: { error: "Not Found" },
      status_code: HttpStatus.NOT_FOUND,
    };
  }
}
