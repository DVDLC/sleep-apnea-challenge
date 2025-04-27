import { z } from "@/deps.ts";

export const RequestBodyLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RequestBodyLoginType = z.infer<typeof RequestBodyLoginSchema>;
