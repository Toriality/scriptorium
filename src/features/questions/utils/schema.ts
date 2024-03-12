import { t } from "i18next";
import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  text: z
    .string()
    .min(24, t("questions.forms.errors.text.min"))
    .max(5000, t("questions.forms.errors.text.max")),
  options: z
    .array(
      z
        .string()
        .min(1, t("questions.forms.errors.options.min"))
        .max(2500, t("questions.forms.errors.options.max")),
    )
    .length(4),
  answer: z.coerce.number(),
  tags: z
    .array(z.number())
    .max(3, t("questions.forms.errors.tags.max"))
    .optional()
    .default([]),
  category_id: z.number(),
});

export type FormData = z.infer<typeof schema>;
