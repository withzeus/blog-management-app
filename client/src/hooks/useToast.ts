import Swal, { SweetAlertIcon } from "sweetalert2";

type ToastPosition = "top" | "bottom";

export const useToast = () => {
  const showToast = (
    icon: SweetAlertIcon,
    title: string,
    description?: string,
    position: ToastPosition = "top"
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: description,
      toast: true,
      timer: 5000,
      position,
      showConfirmButton: false,
    });
  };

  const showToastError = (
    title: string,
    description?: string,
    position?: ToastPosition
  ) => {
    showToast("error", title, description, position);
  };

  const showToastSuccess = (
    title: string,
    description?: string,
    position?: ToastPosition
  ) => {
    showToast("success", title, description, position);
  };

  return {
    showToastError,
    showToastSuccess,
  };
};
