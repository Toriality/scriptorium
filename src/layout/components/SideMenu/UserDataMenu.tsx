import { SideMenuDataList } from "./SideMenuDataList";

export const UserDataMenu = () => {
  const menu_items = [
    {
      name: "Open subjects folder",
      onClick: () => {
        window.ipcRenderer.openSubjectsFolder();
      },
    },
  ];
  return <SideMenuDataList items={menu_items} title="User Data" />;
};
