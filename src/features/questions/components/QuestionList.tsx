import { IconButton } from "@/components/UI/IconButton";
import { DataList } from "@/features/data-list";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { QuestionDatabaseType } from "../types";

interface QuestionList {
  questions: QuestionDatabaseType[] | null;
  deleteQuestion: (question: QuestionDatabaseType) => void;
}

export const QuestionList: React.FC<QuestionList> = ({
  questions,
  deleteQuestion,
}) => {
  const navigate = useNavigate();
  return (
    <DataList
      items={questions}
      of="questions"
      itemComponent={(item) => (
        <DataList.Item item={item}>
          <p className="w-[80%] truncate text-sm">{item.text}</p>
          <DataList.Item.Link to={`questions/${item.id}`} />
          <DataList.Item.Hover>
            <IconButton
              icon="pen"
              type="edit"
              onClick={() => navigate(`questions/${item.id}/edit`)}
            />
            <IconButton
              icon="trash"
              type="delete"
              onClick={() => deleteQuestion(item)}
            />
          </DataList.Item.Hover>
        </DataList.Item>
      )}
      skeleton={<Skeleton count={3} height={40} containerClassName="w-full" />}
    />
  );
};
