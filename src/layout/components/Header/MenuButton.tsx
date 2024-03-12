import { HeaderButton } from "./HeaderButton";

interface MenuButtonProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ setIsMenuOpen }) => {
  return (
    <div className="flex flex-grow">
      <HeaderButton icon="bars" onClick={() => setIsMenuOpen(true)} />
    </div>
  );
};
