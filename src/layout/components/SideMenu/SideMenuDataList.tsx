import { DataList } from "@/features/data-list";

interface MenuProps {
  items: MenuItem[];
  title: string;
}

type MenuItem = {
  name: string;
  edit?: (toggleEditMode: () => void) => React.ReactNode;
  hover?: React.ReactNode;
  onClick?: () => void;
};

export const SideMenuDataList = ({ items, title }: MenuProps) => {
  return (
    <div>
      <p className="p-1 text-xs font-bold">{title.toUpperCase()}</p>
      <div>
        <DataList
          of={""}
          items={items}
          itemComponent={(item, toggleEditMode) => (
            <DataList.Item item={item} className="flex cursor-pointer">
              {item.edit ? (
                <DataList.Item.EditableContent
                  content={(isEditing) =>
                    isEditing && item.edit ? (
                      <>{item.edit(toggleEditMode)}</>
                    ) : (
                      <>
                        <div
                          onClick={toggleEditMode}
                          className="absolute left-0 size-full"
                        />
                        <p className="size-full">{item.name}</p>
                      </>
                    )
                  }
                />
              ) : (
                <>
                  <div
                    className="absolute left-0 size-full"
                    onClick={item.onClick}
                  />
                  <p className="size-full">{item.name}</p>
                </>
              )}
              <DataList.Item.Hover>{item.hover}</DataList.Item.Hover>
            </DataList.Item>
          )}
          skeleton={null}
        />
      </div>
    </div>
  );
};
