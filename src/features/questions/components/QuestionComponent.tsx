import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "marked-react";
import { useMemo } from "react";
import { QuestionDatabaseType } from "../types";
import { TagComponent, useTags } from "@/features/tags";
import { twMerge } from "tailwind-merge";
import { convert } from "../utils/convert";
import { useTheme } from "@/providers/Theme/useTheme";
import { fadeWhenVisible } from "@/lib/Motion";

interface QuestionComponentProps {
  question: QuestionDatabaseType;
  index: number | null;
  answer: number | null;
  setAnswer: (i: number | null, answer: number) => void;
  submittedAnswer?: number;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  index,
  question,
  answer,
  setAnswer,
  submittedAnswer,
}) => {
  const { theme } = useTheme();
  const { tags } = useTags(JSON.parse(question.tags));

  const formattedQuestion = useMemo(() => {
    if (!question) return null;
    else return convert(question);
  }, [question]);

  if (!formattedQuestion) return null;

  const getOptionClass = (i: number) => {
    const isSelected = answer === i;
    const isCorrect =
      submittedAnswer === undefined ? false : formattedQuestion.answer === i;
    const isSubmittedIncorrect =
      submittedAnswer !== undefined &&
      i === submittedAnswer &&
      i !== formattedQuestion.answer;

    const baseClass =
      "bg-item-default hover:bg-item-hover ring-primary flex items-center gap-4 rounded p-4 shadow ring-2";
    const isCorrectClass = "bg-correct hover:bg-correct ring-correct";
    const isSelectedClass =
      "bg-selected-default hover:bg-selected-hover ring-selected";
    const isSubmittedIncorrectClass =
      "bg-incorrect hover:bg-incorrect ring-incorrect";

    return twMerge(
      baseClass,
      isSelected && isSelectedClass,
      isSubmittedIncorrect && isSubmittedIncorrectClass,
      isCorrect && isCorrectClass,
    );
  };

  return (
    <motion.div {...fadeWhenVisible} className="w-full">
      <div className="flex w-full gap-2">
        {index === null ? (
          <FontAwesomeIcon
            icon="question-circle"
            size="xl"
            className="p-1 text-green-600"
          />
        ) : (
          <div className="flex size-8 items-center justify-center bg-accent text-lg font-black">
            {index + 1}
          </div>
        )}
        <article
          className={twMerge("prose", theme === "theme-dark" && "prose-invert")}
        >
          <Markdown>{formattedQuestion.text}</Markdown>
        </article>
      </div>
      <ul className="flex justify-end gap-2">
        {tags?.map((t) => (
          <TagComponent className="text-xs" key={t.id} tag={t} />
        ))}
      </ul>
      <ul className="mt-2 space-y-2">
        {formattedQuestion.options.map((o, i) => (
          <li
            key={i}
            className={getOptionClass(i)}
            onClick={() => setAnswer(index, i)}
          >
            <p className="font-bold">{(i + 10).toString(36).toUpperCase()}.</p>
            <article
              className={twMerge(
                "prose",
                theme === "theme-dark" && "prose-invert",
              )}
            >
              <Markdown>{o}</Markdown>
            </article>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
