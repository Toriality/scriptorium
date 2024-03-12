import { IconButton } from "@/components/UI/IconButton";
import { DataList } from "@/features/data-list";
import Skeleton from "react-loading-skeleton";
import { Test } from "../types";

interface TestListProps {
  tests: Test[] | null;
  deleteTest: (test: Test) => void;
}

export const TestList: React.FC<TestListProps> = ({ tests, deleteTest }) => {
  return (
    <DataList
      items={tests}
      of="tests"
      itemComponent={(item) => (
        <DataList.Item item={item}>
          <p>{item.name}</p>
          <DataList.Item.Link to={`./tests/${item.id}`} />
          <DataList.Item.Hover>
            <IconButton
              type="delete"
              icon="trash"
              onClick={() => deleteTest(item)}
            />
          </DataList.Item.Hover>
        </DataList.Item>
      )}
      skeleton={<Skeleton count={3} containerClassName="w-full" height={50} />}
    />
  );
};
