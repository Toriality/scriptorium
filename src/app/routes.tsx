import {
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import { HomePage, NewSubjectPage, ShowSubjectPage } from "@/features/subjects";
import { ShowCategoryPage, NewCategoryPage } from "@/features/categories";
import {
  ShowQuestionPage,
  NewQuestionPage,
  EditQuestionPage,
} from "@/features/questions";
import { NewTestPage, ShowTestPage } from "@/features/tests";
import { AnimatePresence } from "framer-motion";

export const Routes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ReactRouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="new" element={<NewSubjectPage />} />
        <Route path=":subject_name">
          <Route index element={<ShowSubjectPage />} />
          <Route path="new" element={<NewCategoryPage />} />
          <Route path=":category_id">
            <Route index element={<ShowCategoryPage />} />
            <Route path="questions">
              <Route path=":question_id" element={<ShowQuestionPage />} />
              <Route path="new" element={<NewQuestionPage />} />
              <Route path=":question_id/edit" element={<EditQuestionPage />} />
            </Route>
            <Route path="tests">
              <Route path=":test_id" element={<ShowTestPage />} />
              <Route path="new" element={<NewTestPage />} />
            </Route>
          </Route>
        </Route>
      </ReactRouterRoutes>
    </AnimatePresence>
  );
};
