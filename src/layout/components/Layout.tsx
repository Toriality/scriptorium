import { useState } from "react";
import { useTheme } from "@/providers/Theme/useTheme";
import { Header } from "./Header/Header";
import { twMerge } from "tailwind-merge";
import { SideMenu } from "./SideMenu/SideMenu";

export const Layout = ({ children }: React.PropsWithChildren) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themeClassName = theme === "default" ? null : theme;

  return (
    <div
      className={twMerge(
        themeClassName,
        "flex h-screen flex-col items-center overflow-y-hidden bg-main",
      )}
    >
      <Header setIsMenuOpen={setIsMenuOpen} />
      {children}
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};
