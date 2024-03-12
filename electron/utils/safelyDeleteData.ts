import { dialog } from "electron";

export async function safelyDeleteData<T>({
  condition,
  dialogMessage,
  onSuccess,
  returnPayload,
}: {
  condition: boolean;
  dialogMessage: string;
  onSuccess: () => Promise<void>;
  returnPayload?: T;
}) {
  if (condition) {
    const response = await dialog.showMessageBox({
      type: "warning",
      message: dialogMessage,
      buttons: ["Yes", "No"],
    });

    if (response.response === 1) {
      return {
        success: false,
        message: "Data not deleted.",
      } as PromptMessage<T>;
    }
  }

  await onSuccess();

  return {
    success: true,
    message: "Data deleted successfully.",
    payload: returnPayload,
  } as PromptMessage<T>;
}
