import { supabase } from "@/deps.ts";
import { PatientUpdatePayloadType } from "@/schemas/patient_service_schema.ts";
import { PatientModelType } from "@common/config/database/interfaces.ts";
import { HttpStatus } from "@common/config/http_status.ts";
import { CustomException } from "@common/utils/custom_exceptions.ts";
import { PostgrestSingleResponse } from "jsr:@supabase/supabase-js@2";

interface PatientRepositoryI {
  findOne(email: string): Promise<PatientModelType>;
  update(
    id: string,
    params: PatientUpdatePayloadType,
  ): Promise<PatientModelType>;
}

export class PatientRepository implements PatientRepositoryI {
  async findOne(email: string): Promise<PatientModelType> {
    const response = await supabase
      .from("patients")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    return this.handleSingleResponse(response);
  }

  async update(
    id: string,
    params: PatientUpdatePayloadType,
  ): Promise<PatientModelType> {
    const response = await supabase
      .from("patients")
      .update(params)
      .eq("id", id)
      .select("*")
      .maybeSingle();

    return this.handleSingleResponse(response);
  }

  private handleSingleResponse(
    response: PostgrestSingleResponse<PatientModelType | null>,
  ): PatientModelType {
    if (!response || response.error) {
      throw new Error(`Database error: ${response.error.message}`);
    }

    if (!response.data) {
      throw new CustomException(
        "on error - patient not found",
        HttpStatus.NOT_FOUND,
      );
    }

    return response.data;
  }
}
