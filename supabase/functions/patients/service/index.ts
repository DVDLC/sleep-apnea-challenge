import { PatientRepository } from "@/repository/index.ts";
import type { RequestBodyType } from "@/schemas/patient_service_schema.ts";
import { requestBodySchema } from "@/schemas/patient_service_schema.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import { ResponseI } from "@common/interfaces/main_router.ts";
import { ApiService } from "@common/utils/api_service.ts";
import { CustomException } from "@common/utils/custom_exceptions.ts";
import { requestValidator } from "@common/utils/request_validator.ts";
import { serviceErrorHandler } from "@common/utils/service_error_handler.ts";

interface PatientServiceI {
  insuranceApiService: ApiService;
  patientRepository: PatientRepository;

  verifyPatients(requestBody: RequestBodyType): Promise<unknown>;
}

export class PatientService implements PatientServiceI {
  insuranceApiService: ApiService;
  patientRepository: PatientRepository;

  constructor(
    insuranceApiService: ApiService,
    patientRepository: PatientRepository,
  ) {
    this.patientRepository = patientRepository;
    this.insuranceApiService = insuranceApiService;
  }

  @serviceErrorHandler
  @requestValidator(requestBodySchema)
  public async verifyPatients(
    requestBody: RequestBodyType,
  ): Promise<ResponseI<Record<string, unknown>>> {
    const data = requestBody;

    const patient = await this.patientRepository.findOne(data.email);

    if (!patient) {
      throw new CustomException(
        "on error - patient not found",
        HttpStatus.BAD_REQUEST,
      );
    }

    const api_response = await this.insuranceApiService.get(
      "/insurance-users",
      { id: "d24b39db-7d2c-4e18-81f9-116a9570e240" },
    );

    console.log("Api response", api_response);

    return { data, status_code: HttpStatus.NOT_FOUND };
  }
}
