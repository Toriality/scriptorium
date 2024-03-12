export const DIALOG_MESSAGES = {
  DELETE_SUBJECT: (
    subject_name: string,
    number_of_categories: number,
    number_of_tags: number,
  ) =>
    `Deleting subject ${subject_name} will also delete ${number_of_categories} ${number_of_categories > 1 ? "categories" : "category"} and ${number_of_tags} ${number_of_tags > 1 ? "tags" : "tag"} within it. Are you sure you want to delete this subject?`,
  DELETE_CATEGORY: (
    category_name: string,
    number_of_questions: number,
    number_of_tests: number,
  ) =>
    `Deleting category ${category_name} will also delete ${number_of_questions} ${number_of_questions > 1 ? "questions" : "question"} and ${number_of_tests} ${number_of_tests > 1 ? "tests" : "test"} within it. Are you sure you want to delete this category?`,
  DELETE_TAG: (tag_name: string, number_of_associated_questions: number) =>
    `By deleting the tag "${tag_name}, ${number_of_associated_questions} ${number_of_associated_questions > 1 ? "questions" : "question"} that includes this tag will no more include it. Are you sure you want to delete this tag?`,
  DELETE_QUESTION: (number_of_associated_tests: number) =>
    `Deleting this question will also delete ${number_of_associated_tests} ${number_of_associated_tests > 1 ? "tests" : "test"} associated with it. Are you sure you want to delete this question?`,
};
