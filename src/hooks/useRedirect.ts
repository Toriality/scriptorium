import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  to: string;
  toast?: {
    message: string;
    type?: "error" | "info" | "success" | "warning";
  };
}

export const useRedirect = () => {
  const navigate = useNavigate();

  function redirect({ to, toast: t }: Props) {
    if (t) toast(t.message, { type: t.type || "default" });
    navigate(to, { replace: true });
  }

  return { redirect };
};
