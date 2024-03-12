import { schema, FormData } from "../utils/schema";
import { DataList } from "@/features/data-list";
import Skeleton from "react-loading-skeleton";
import { CategoryIcon } from "./CategoryIcon";
import { IconButton } from "@/components/UI/IconButton";
import { TextInput } from "@/components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, CategoryData } from "../types";
import { useTranslation } from "react-i18next";

interface CategoryList {
  categories: CategoryData[] | null;
  deleteCategory: (category: CategoryData) => void;
  editCategory: (oldCategory: Category, newCategory: Category) => void;
}

export const CategoryList: React.FC<CategoryList> = ({
  categories,
  deleteCategory,
  editCategory,
}) => {
  const { t } = useTranslation();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function startEdit(togglerFunc: () => void, item: CategoryData) {
    setValue("name", item.category.name);
    setValue("icon", item.category.icon || "");
    togglerFunc();
  }

  function submitEdit(
    data: FormData,
    togglerFunc: () => void,
    item: CategoryData,
  ) {
    editCategory(item.category, {
      ...item.category,
      name: data.name,
      icon: data.icon,
    });
    togglerFunc();
  }

  return (
    <DataList
      items={categories}
      of="categories"
      itemComponent={(item, toggleEditMode) => (
        <DataList.Item item={item}>
          <DataList.Item.EditableContent
            content={(isEditing) => (
              <>
                {isEditing ? (
                  <form
                    className="flex grow items-center justify-between"
                    onSubmit={handleSubmit((data) =>
                      submitEdit(data, toggleEditMode, item),
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <CategoryIcon icon={watch("icon")} />
                      <div className="space-y-1 text-sm">
                        <TextInput
                          hideLabel
                          error={errors.name?.message}
                          placeholder={t("categories.forms.name")}
                          autoFocus
                          {...register("name")}
                        />
                        <TextInput
                          hideLabel
                          error={errors.icon?.message}
                          placeholder={t("categories.forms.icon")}
                          {...register("icon")}
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 text-sm">
                      <IconButton
                        error={!!errors.name || !!errors.icon}
                        type="add"
                        icon="check"
                        onClick={handleSubmit((data) =>
                          submitEdit(data, toggleEditMode, item),
                        )}
                      />
                      <IconButton
                        type="delete"
                        icon="x"
                        onClick={toggleEditMode}
                      />
                    </div>
                  </form>
                ) : (
                  <>
                    <DataList.Item.Link to={`${item.category.id}`} />
                    <div className="flex items-center gap-4">
                      <CategoryIcon icon={item.category.icon} />
                      <p>{item.category.name}</p>
                    </div>
                    <DataList.Item.Shy>
                      <DataList.Item.Stats
                        icon="question-circle"
                        display={item.numberOfQuestions}
                      />
                      <DataList.Item.Stats
                        icon="lightbulb"
                        display={item.numberOfTests}
                      />
                    </DataList.Item.Shy>
                    <DataList.Item.Hover>
                      <IconButton
                        type="edit"
                        onClick={() => startEdit(toggleEditMode, item)}
                        icon="pen"
                      />
                      <IconButton
                        type="delete"
                        icon="trash"
                        onClick={() => deleteCategory(item)}
                      />
                    </DataList.Item.Hover>
                  </>
                )}
              </>
            )}
          />
        </DataList.Item>
      )}
      skeleton={<Skeleton height={40} count={5} />}
    />
  );
};
