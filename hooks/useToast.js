import { toast } from "react-toastify";

const useToast = () => {
  const showToast = (message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message, "Success");
        break;
      case "error":
        toast.error(message, "Error");
        break;
      case "info":
        toast.info(message, "Info");
        break;
      case "warning":
        toast.info(message, "Warning");
        break;
      default:
        toast(message);
        break;
    }
  };

  return { showToast };
};

export default useToast;
