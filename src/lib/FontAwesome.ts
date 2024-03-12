import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBook,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faLightbulb,
  faPen,
  faQuestionCircle,
  faTags,
  faTrash,
  faWindowMaximize,
  faWindowMinimize,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export const initFontAwesome = () =>
  library.add(
    faBook,
    faTags,
    faPen,
    faTrash,
    faX,
    faCheck,
    faQuestionCircle,
    faLightbulb,
    faBars,
    faWindowMinimize,
    faWindowMaximize,
    faChevronLeft,
    faChevronRight,
  );
