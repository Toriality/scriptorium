import { z } from "zod";

const testSchema = z.object({
  category_id: z.number(),
  name: z
    .string()
    .min(1, "Please enter a name")
    .max(64, "Test name is too long"),
});

export const customTestSchema = z.object({
  ...testSchema.shape,
  questions: z.array(z.number()).min(1, "Please enter at least one question"),
});

export const randomTestSchema = z.object({
  ...testSchema.shape,
  numberOfQuestions: z.coerce
    .number()
    .min(1, "Please enter a number of questions"),
  tags: z.array(z.number()),
});

export type CustomTestSchemaType = z.infer<typeof customTestSchema>;
export type RandomTestSchemaType = z.infer<typeof randomTestSchema>;
