import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      position="top-right"
      expand
      visibleToasts={5}
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "8px",
        },
      }}
    />
  );
}
