import { HeaderButton } from "../Header/HeaderButton";
import { twMerge } from "tailwind-merge";
import { SettingsMenu } from "./SettingsMenu";
import { UserDataMenu } from "./UserDataMenu";

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideMenu: React.FC<MenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const closeOnClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={twMerge(
        "absolute z-20 flex h-full w-full bg-black/50 backdrop-blur-sm",
        isMenuOpen ? "block" : "hidden",
      )}
      onClick={closeOnClickOutside}
    >
      <div className="flex h-full w-72 flex-col bg-main p-1 text-primary">
        <HeaderButton
          icon="x"
          onClick={() => setIsMenuOpen(false)}
          className="mb-8 mr-auto hover:bg-red-500"
        />
        <div className="space-y-6">
          <SettingsMenu />
          <UserDataMenu />
        </div>
      </div>
    </div>
  );
};
