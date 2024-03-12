import { t } from "i18next";
import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, t("tags.forms.errors.min"))
    .max(12, t("tags.forms.errors.max"))
    .regex(/^[a-zA-Z]+$/, t("tags.forms.errors.regex")),
});

export type FormData = z.infer<typeof schema>;
