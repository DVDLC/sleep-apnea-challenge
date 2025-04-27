import { z } from "@/deps.ts";

export const requestBodySchema = z.object({
  email: z.string().email(),
  insurance_id: z.string().uuid(),
});

export type RequestBodyType = z.infer<typeof requestBodySchema>;
