import { z } from "@/deps.ts";

export const requestBodySchema = z.object({
  email: z.string().email(),
  insurance_id: z.string().uuid(),
});

export const PatientUpdatePayload = z.object({
  insurance_verified: z.boolean().optional(),
});

export type RequestBodyType = z.infer<typeof requestBodySchema>;

export type PatientUpdatePayloadType = z.infer<typeof PatientUpdatePayload>;
