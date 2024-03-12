import { HeaderButton } from "./HeaderButton";

export const MainButtons: React.FC = () => {
  const handleQuit = () => {
    window.ipcRenderer.sendQuit();
  };

  const handleMinimize = () => {
    window.ipcRenderer.sendMinimize();
  };

  const handleMaximize = () => {
    window.ipcRenderer.sendMaximize();
  };

  return (
    <div className="flex flex-grow justify-end">
      <HeaderButton icon="window-minimize" onClick={handleMinimize} />
      <HeaderButton icon="window-maximize" onClick={handleMaximize} />
      <HeaderButton
        icon="x"
        onClick={handleQuit}
        className="hover:bg-red-500"
      />
    </div>
  );
};
