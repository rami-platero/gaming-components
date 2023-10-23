import { toast } from "react-toastify";

const useToast = () => {
  const notifyError = (message: string) => {
    toast.error(message, {
      theme: "colored",
      position: "top-center",
      autoClose: false,
    });
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      theme: "colored",
      position: "top-center",
      autoClose: false,
    });
  };

  const notifyTemporalSuccess = (message:string) => {
    toast.success(message, {
      theme: "colored",
      position: "top-center",      
    });
  }
  return {notifyError,notifySuccess, notifyTemporalSuccess};
};

export default useToast;
