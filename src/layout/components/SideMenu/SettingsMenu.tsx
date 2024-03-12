import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { EditableSettings } from "./EditableSettings";
import { useTheme } from "@/providers/Theme/useTheme";
import { Theme } from "@/providers/Theme/ThemeProvider";
import { useTranslation } from "react-i18next";
import { SideMenuDataList } from "./SideMenuDataList";

export const SettingsMenu = () => {
  const [songStatus, setSongStatus] = useState<boolean>(
    localStorage.getItem("songStatus") === "true" ? true : false,
  );
  const { theme, setTheme } = useTheme();
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  useEffect(() => {
    localStorage.setItem("songStatus", songStatus.toString());
  }, [songStatus]);

  const changeCurrentLanguage = (lang: string) => {
    changeLanguage(lang);
    localStorage.setItem("locale", lang);
  };

  const findCurrentLanguage = () => {
    if (!language) return supportedLanguages[0];
    return supportedLanguages.find((lang) => lang.language === language)!;
  };

  const findCurrentTheme = () => {
    if (!theme) return supportedThemes[0];
    return supportedThemes.find((t) => t.theme === theme)!;
  };

  const menu_items = [
    {
      name: "Language",
      edit: (toggleEditMode: () => void) => (
        <EditableSettings
          items={supportedLanguages}
          selectedString={language}
          toggleEditMode={toggleEditMode}
          itemSelectionKey="language"
          itemChildren={(lang) => (
            <ReactCountryFlag countryCode={lang.code} svg className="mb-0.5" />
          )}
          onClick={(item) => changeCurrentLanguage(item.language)}
        />
      ),
      hover: <ReactCountryFlag countryCode={findCurrentLanguage().code} svg />,
    },
    {
      name: "Theme",
      edit: (toggleEditMode: () => void) => (
        <EditableSettings
          className="text-sm"
          items={supportedThemes}
          toggleEditMode={toggleEditMode}
          itemSelectionKey="theme"
          selectedString={theme}
          itemChildren={(theme) => <p>{theme.name}</p>}
          onClick={(item) => setTheme(item.theme)}
        />
      ),
      hover: findCurrentTheme().name.toUpperCase(),
    },
    {
      name: "Sounds",
      hover: songStatus ? (
        <p className="rounded bg-correct px-1 font-bold">ON</p>
      ) : (
        <p className="rounded bg-incorrect px-1 font-bold">OFF</p>
      ),
      onClick: () => setSongStatus(!songStatus),
    },
  ];
  return <SideMenuDataList items={menu_items} title="Settings" />;
};

const supportedLanguages = [
  {
    name: "English",
    code: "us",
    language: "en",
  },
  {
    name: "Portuguese",
    code: "br",
    language: "pt-BR",
  },
  {
    name: "Czech",
    code: "cz",
    language: "cz",
  },
];

const supportedThemes: { name: string; theme: Theme }[] = [
  {
    name: "Lightorium",
    theme: "default",
  },
  {
    name: "Noctorium",
    theme: "theme-dark",
  },
];
