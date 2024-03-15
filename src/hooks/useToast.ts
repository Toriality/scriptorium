import { useNavigate } from "react-router-dom";
import { toast as toastify } from "react-toastify";

interface Props {
  shouldRedirect: boolean;
  to?: string;
  toast?: {
    message: string;
    type?: "error" | "info" | "success" | "warning";
  };
}

export const useToast = () => {
  const navigate = useNavigate();

  function toast({ shouldRedirect, to, toast: t }: Props) {
    if (t) toastify(t.message, { type: t.type || "default" });
    if (shouldRedirect && to) navigate(to, { replace: true });
  }

  return { toast };
};
