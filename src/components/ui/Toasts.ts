import { ToastOptions, toast } from "react-toastify";

export const Toasts: Record<ToastType, ToastFunc> = {
  info: (content: string, options?: ToastOptions) => {
    toast(content, {
      ...options,
      ...OptionsForAll,
      type: "info",
    });
  },
  success: (content: string, options?: ToastOptions) =>
    toast(content, {
      ...options,
      ...OptionsForAll,
      type: "success",
    }),
  error: (content: string, options?: ToastOptions) =>
    toast(content, {
      ...options,
      ...OptionsForAll,
      type: "error",
    }),

  warning: (content: string, options?: ToastOptions) => {
    toast(content, {
      ...options,
      ...OptionsForAll,
      type: "warning",
    });
  },
};

export const OptionsForAll: Partial<ToastOptions> = {
  autoClose: 5000,
  hideProgressBar: true,
};

export type ToastFunc = (content: string, options?: ToastOptions) => void;

export type ToastType = "info" | "success" | "error" | "warning";
