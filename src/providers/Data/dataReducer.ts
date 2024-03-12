import { DataAction, DataState } from "./types";
import { CategoryData } from "@/features/categories";
import { SubjectData } from "@/features/subjects";

export function dataReducer(state: DataState, action: DataAction): DataState {
  /** This will map the subject array and find the current subject, applying the given function to change it */
  function changeCurrentSubject(fn: (s: SubjectData) => object): SubjectData[] {
    return state.subjects!.map((subject) => {
      if (subject.subject === state.current.subject!.subject) {
        return {
          ...subject,
          ...fn(subject),
        };
      } else return subject;
    });
  }

  function changeCurrentCategory(
    fn: (c: CategoryData) => object,
  ): CategoryData[] {
    return state.current.subject!.categories.map((category) => {
      if (category.category.id === state.current.category!.category.id) {
        return {
          ...category,
          ...fn(category),
        };
      } else return category;
    });
  }

  switch (action.type) {
    case "LEAVE_ALL_CURRENT_DATA":
      return { ...state, current: { subject: null, category: null } };
    case "LEAVE_CURRENT_CATEGORY_DATA":
      return { ...state, current: { ...state.current, category: null } };

    case "SET_CURRENT_SUBJECT":
      return {
        ...state,
        current: { ...state.current, subject: action.payload },
      };
    case "SET_SUBJECTS":
      return { ...state, subjects: action.payload };
    case "CREATE_SUBJECT":
      return {
        ...state,
        subjects: [
          ...state.subjects!,
          {
            subject: action.payload,
            numberOfTags: 0,
            numberOfCategories: 0,
          },
        ],
      };
    case "EDIT_SUBJECT":
      return {
        ...state,
        subjects: state.subjects!.map((subject) =>
          subject.subject === action.payload.oldSubject.subject
            ? action.payload.newSubject
            : subject,
        ),
      };
    case "DELETE_SUBJECT":
      return {
        ...state,
        subjects: state.subjects!.filter(
          (subject) => subject.subject !== action.payload.subject,
        ),
      };

    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        current: { ...state.current, category: action.payload },
      };
    case "CREATE_CATEGORY":
      return {
        ...state,
        current: {
          ...state.current,
          subject: {
            ...state.current.subject!,
            categories: [
              ...state.current.subject!.categories,
              {
                category: action.payload,
                numberOfQuestions: 0,
                numberOfTests: 0,
              },
            ],
          },
        },
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        current: {
          ...state.current,
          subject: {
            ...state.current.subject!,
            categories: state.current.subject!.categories.map((category) =>
              category.category === action.payload.oldCategory
                ? { ...category, category: action.payload.newCategory }
                : category,
            ),
          },
        },
      };
    case "DELETE_CATEGORY":
      return {
        current: {
          ...state.current,
          subject: {
            ...state.current.subject!,
            categories: state.current.subject!.categories.filter(
              (category) => category.category !== action.payload.category,
            ),
          },
        },
        subjects: changeCurrentSubject((subject) => {
          return {
            numberOfCategories: subject.numberOfCategories - 1,
          };
        }),
      };

    case "ADD_TAG":
      return {
        subjects: changeCurrentSubject((subject) => {
          return {
            numberOfTags: subject.numberOfTags + 1,
          };
        }),
        current: {
          ...state.current,
          subject: {
            ...state.current.subject!,
            tags: [...state.current.subject!.tags, action.payload.tag],
          },
        },
      };
    case "DELETE_TAG":
      return {
        subjects: changeCurrentSubject((subject) => {
          return {
            numberOfTags: subject.numberOfTags - 1,
          };
        }),
        current: {
          ...state.current,
          subject: {
            ...state.current.subject!,
            tags: state.current.subject!.tags.filter(
              (tag) => tag.id !== action.payload.tag.id,
            ),
          },
        },
      };

    case "CREATE_QUESTION":
      return {
        ...state,
        current: {
          subject: {
            ...state.current.subject!,
            categories: changeCurrentCategory((category) => {
              return {
                numberOfQuestions: category.numberOfQuestions + 1,
              };
            }),
          },
          category: {
            ...state.current.category!,
            questions: [...state.current.category!.questions, action.payload],
          },
        },
      };
    case "EDIT_QUESTION":
      return {
        ...state,
        current: {
          ...state.current,
          category: {
            ...state.current.category!,
            questions: state.current.category!.questions.map((question) => {
              if (question.id === action.payload.id) {
                return action.payload;
              } else return question;
            }),
          },
        },
      };
    case "DELETE_QUESTION":
      return {
        ...state,
        current: {
          subject: {
            ...state.current.subject!,
            categories: state.current.subject!.categories.map((category) => {
              if (
                category.category.id === state.current.category!.category.id
              ) {
                return {
                  ...category,
                  numberOfQuestions: category.numberOfQuestions - 1,
                  numberOfTests:
                    category.numberOfTests -
                    action.payload.associatedTests.length,
                };
              } else return category;
            }),
          },
          category: {
            ...state.current.category!,
            questions: state.current.category!.questions.filter(
              (question) => question.id !== action.payload.question.id,
            ),
            tests: state.current.category!.tests.filter(
              (test) => !action.payload.associatedTests.includes(test.id),
            ),
          },
        },
      };

    case "CREATE_TEST":
      return {
        ...state,
        current: {
          subject: {
            ...state.current.subject!,
            categories: changeCurrentCategory((category) => {
              return {
                numberOfTests: category.numberOfTests + 1,
              };
            }),
          },
          category: {
            ...state.current.category!,
            tests: [...state.current.category!.tests, action.payload],
          },
        },
      };
    case "DELETE_TEST":
      return {
        ...state,
        current: {
          subject: {
            ...state.current.subject!,
            categories: changeCurrentCategory((category) => {
              return {
                numberOfTests: category.numberOfTests - 1,
              };
            }),
          },
          category: {
            ...state.current.category!,
            tests: state.current.category!.tests.filter(
              (test) => test.id !== action.payload.id,
            ),
          },
        },
      };
    case "SUBMIT_TEST":
      return {
        ...state,
        current: {
          ...state.current,
          category: {
            ...state.current.category!,
            tests: state.current.category!.tests.map((test) => {
              if (test.id === action.payload.id) {
                return action.payload;
              } else return test;
            }),
          },
        },
      };

    default:
      return state;
  }
}
