import Skeleton from "react-loading-skeleton";
import { TagComponent } from "./Tag";
import { TextInput } from "@/components/Form";
import { useForm } from "react-hook-form";
import { FormData, schema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "../types";
import { useTranslation } from "react-i18next";

interface TagListProps {
  tags: Tag[] | null;
  handleDelete?: (tag: Tag) => void;
  handleAddTag?: (name: string) => void;
  handleToggleTag?: (tag: Tag) => void;
  toggledTags?: number[];
}

const skeletonRandomWidth = () => Math.floor(Math.random() * 100) + 50;

export const TagList: React.FC<TagListProps> = ({
  tags,
  handleDelete,
  handleAddTag,
  handleToggleTag,
  toggledTags,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function addTag(data: FormData, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAddTag!(data.name);
      setValue("name", "");
    }
  }
  function addTagFail(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  }

  return (
    <>
      {tags ? (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <TagComponent
              key={tag.id}
              tag={tag}
              handleDelete={handleDelete}
              handleToggleTag={handleToggleTag}
              isToggledByDefault={toggledTags?.includes(tag.id)}
            />
          ))}
          {handleAddTag && (
            <TextInput
              error={errors.name?.message}
              containerClassName="flex flex-col items-center justify-center w-full text-sm"
              inputClassName="w-24 text-center"
              placeholder={t("tags.forms.name")}
              onKeyDown={(e) =>
                handleSubmit(
                  (data) => addTag(data, e),
                  () => addTagFail(e),
                )()
              }
              {...register("name")}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={25} width={skeletonRandomWidth()} />
          ))}
        </div>
      )}
    </>
  );
};
