export interface InsuranceVerificationUser {
  name: string;
  gender: "male" | "female" | "other";
  birthdate: string;
  email: string;
  phone: string;
}

export interface InsuranceVerificationRecord {
  user: InsuranceVerificationUser;
  verified: boolean;
  id: string;
}

export type InsuranceVerificationList = InsuranceVerificationRecord[];
