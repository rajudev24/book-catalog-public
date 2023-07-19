declare module "react-toastify" {
  export { ToastContainer } from "react-toastify";
  export const toast: {
    success: (content: string, options?: Record<string, unknown>) => void;
    error: (content: string, options?: Record<string, unknown>) => void;
    // Add other methods if needed
  };
}
