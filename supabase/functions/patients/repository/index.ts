import { supabase } from "@/deps.ts";
import type { PatientModelType } from "@common/config/database/interfaces.ts";

interface PatientRepositoryI {
  findOne(email: string): Promise<PatientModelType | null>;
}

export class PatientRepository implements PatientRepositoryI {
  async findOne(email: string): Promise<PatientModelType | null> {
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw new Error(
        `on error - something went wrong with the db: ${error.message}`,
      );
    }

    return data;
  }
}
