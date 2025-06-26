import { useTranslation } from "react-i18next";
import { z } from "zod";


export const useLoginSchema = () => {
  const {t} = useTranslation();

  const loginSchema = z.object({
    company: z
      .string({
        required_error: t("login.errors.companyRequired") as string,
      })
      .max(
        35,
        t("login.validation.maxLength", {
          field: t("login.loginForm.company"),
          max: 35,
        }) as string,
      )
      .min(
        8,
        t("login.validation.minLength", {
          field: t("login.loginForm.company"),
          min: 8,
        }) as string,
      )
     ,

    username: z
      .string({
        required_error: t("login.errors.usernameRequired") as string,
      })
      .max(
        30,
        t("login.validation.maxLength", {
          field: t("login.loginForm.username"),
          max: 30,
        }) as string,
      )
      .min(
        2,
        t("login.validation.minLength", {
          field: t("login.loginForm.username"),
          min: 5,
        }) as string,
      ),
      

    password: z
      .string({
        required_error: t("login.errors.passwordRequired") as string,
      })
      .max(
        12,
        t("login.validation.maxLength", {
          field: t("login.loginForm.password"),
          max: 12,
        }) as string,
      )
      .min(
        8,
        t("login.validation.minLength", {
          field: t("login.loginForm.password"),
          min: 8,
        }) as string,
      )
      

   });

  return { loginSchema };
};
