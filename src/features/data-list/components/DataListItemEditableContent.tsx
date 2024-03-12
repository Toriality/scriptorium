import { useDataListItemContext } from "../hooks/useDataListItemContext";
import { useDataListContext } from "../hooks/useDataListContext";

export const DataListItemEditableContent = ({
  content,
}: {
  content: (isEditing: boolean) => React.ReactNode;
}) => {
  const { itemBeingEdited } = useDataListContext();
  const { index } = useDataListItemContext();

  if (itemBeingEdited === index) return <>{content(true)}</>;
  else return <>{content(false)}</>;
};
