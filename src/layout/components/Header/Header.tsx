import { ScriptoriumButton } from "./ScriptoriumButton";
import { MenuButton } from "./MenuButton";
import { MainButtons } from "./MainButtons";
import { HeaderButton } from "./HeaderButton";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const back = () => {
    if (!isHome) navigate(-1);
  };

  const forward = () => {
    if (!isHome) navigate(1);
  };

  return (
    <header className="animated header flex w-full items-center justify-between bg-accent shadow">
      <MenuButton setIsMenuOpen={setIsMenuOpen} />
      <HeaderButton
        disabled={isHome}
        icon="chevron-left"
        onClick={() => back()}
      />
      <div className="relative h-full w-1/6">
        <ScriptoriumButton />
      </div>
      <HeaderButton
        disabled={isHome}
        icon="chevron-right"
        onClick={() => forward()}
      />
      <MainButtons />
    </header>
  );
};
