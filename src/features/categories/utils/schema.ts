import { z } from "zod";
import { t } from "i18next";

export const schema = z.object({
  name: z
    .string()
    .min(4, t("categories.forms.errors.name.min"))
    .max(24, t("categories.forms.errors.name.max"))
    .regex(/^[a-zA-Z0-9\s]+$/, t("categories.forms.errors.name.regex")),
  icon: z.string().url(t("categories.forms.errors.icon")).or(z.literal("")),
});

export type FormData = z.infer<typeof schema>;
