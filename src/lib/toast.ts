import { toast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export const toastHelper = {
  success: ({ title, description, duration }: ToastOptions) => {
    return toast.success(title, {
      description,
      duration,
    });
  },

  error: ({ title, description, duration }: ToastOptions) => {
    return toast.error(title, {
      description,
      duration,
    });
  },

  info: ({ title, description, duration }: ToastOptions) => {
    return toast(title, {
      description,
      duration,
    });
  },

  warning: ({ title, description, duration }: ToastOptions) => {
    return toast.warning(title, {
      description,
      duration,
    });
  },

  loading: ({ title, description, duration }: ToastOptions) => {
    return toast.loading(title, {
      description,
      duration,
    });
  },

  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: { duration?: number }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      ...options,
    });
  },
};
