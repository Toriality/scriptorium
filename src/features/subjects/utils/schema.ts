import { z } from "zod";
import { t } from "i18next";

export const schema = z.object({
  subject: z
    .string()
    .min(4, t("subjects.forms.errors.min"))
    .max(24, t("subjects.forms.errors.max"))
    .regex(/^[a-zA-Z0-9\s]+$/, t("subjects.forms.errors.regex")),
});

export type FormData = z.infer<typeof schema>;
