import type { PatientValidateRequestI } from "@/interfaces/index.ts";
import { requestBodySchema } from "@/schemas/patient_service_schema.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import { ResponseI } from "@common/interfaces/main_router.ts";
import { serviceErrorHandler } from "@common/utils/serviceErrorHandler.ts";

interface PatientServiceI {
  verifyPatients(requestBody: PatientValidateRequestI): Promise<unknown>;
}

export class PatientService implements PatientServiceI {
  @serviceErrorHandler
  public async verifyPatients(
    requestBody: PatientValidateRequestI,
  ): Promise<ResponseI<Record<string, unknown>>> {
    const request = requestBodySchema.safeParse(requestBody);

    console.log("Request", request);

    const data = {
      message: `hola... name!`,
    };

    return { data, status_code: HttpStatus.NOT_FOUND };
  }
}
