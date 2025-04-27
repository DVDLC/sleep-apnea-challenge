import { InsuranceVerificationList } from "@/interfaces/service.interfaces.ts";
import { PatientRepository } from "@/repository/index.ts";
import type { RequestBodyType } from "@/schemas/patient_service_schema.ts";
import { requestBodySchema } from "@/schemas/patient_service_schema.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import { ResponseI } from "@common/interfaces/main_router.ts";
import { ApiService } from "@common/utils/api_service.ts";
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

    const api_response = await this.insuranceApiService.get<
      InsuranceVerificationList
    >(
      "/insurance-users",
      { id: data.insurance_id },
    );

    const insurance_verified = api_response[0].verified;

    await this.patientRepository.update(patient.id, { insurance_verified });

    return { data, status_code: HttpStatus.NOT_FOUND };
  }
}
