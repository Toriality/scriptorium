import { schema, FormData } from "../utils/schema";
import { TextInput } from "@/components/Form";
import { DataList } from "@/features/data-list";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButton } from "@/components/UI/IconButton";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { SubjectData } from "..";

interface Props {
  subjects: SubjectData[] | null;
  deleteSubject: (subject: SubjectData) => void;
  editSubject: (oldSubject: SubjectData, newSubject: SubjectData) => void;
}

export const SubjectList = ({
  subjects,
  deleteSubject,
  editSubject,
}: Props) => {
  const { t } = useTranslation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function startEdit(togglerFunc: () => void, item: SubjectData) {
    setValue("subject", item.subject);
    togglerFunc();
  }

  function submitEdit(
    data: FormData,
    togglerFunc: () => void,
    item: SubjectData,
  ) {
    editSubject(item, { ...item, subject: data.subject });
    togglerFunc();
  }

  return (
    <DataList
      of="subjects"
      items={subjects}
      itemComponent={(item, toggleEditMode) => (
        <DataList.Item item={item}>
          <DataList.Item.EditableContent
            content={(isEditing) => (
              <>
                {isEditing || false ? (
                  <form
                    className="flex grow items-center justify-between"
                    onSubmit={handleSubmit((data) =>
                      submitEdit(data, toggleEditMode, item),
                    )}
                  >
                    <TextInput
                      hideLabel
                      error={errors.subject?.message}
                      placeholder={t("subjects.forms.name")}
                      autoFocus
                      {...register("subject")}
                    />
                    <div className="flex gap-5 text-sm">
                      <IconButton
                        error={!!errors.subject}
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
                    <DataList.Item.Link to={`${item.subject}`} />

                    <p className="break-all">{item.subject}</p>

                    <DataList.Item.Shy>
                      <DataList.Item.Stats
                        icon="book"
                        display={item.numberOfCategories}
                      />
                      <DataList.Item.Stats
                        icon="tags"
                        display={item.numberOfTags}
                      />
                    </DataList.Item.Shy>

                    <DataList.Item.Hover>
                      <IconButton
                        type="edit"
                        icon="pen"
                        onClick={() => startEdit(toggleEditMode, item)}
                      />
                      <IconButton
                        type="delete"
                        icon="trash"
                        onClick={() => deleteSubject(item)}
                      />
                    </DataList.Item.Hover>
                  </>
                )}
              </>
            )}
          />
        </DataList.Item>
      )}
      skeleton={<Skeleton height={50} containerClassName="w-full" count={5} />}
    />
  );
};
