import Toast from "./Toast";
import { createContext, useContext, useState, ReactNode } from "react";

export enum ToastStatusEnum {
  Info = 'info',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

interface ToastContextProps {
  showToast: (message: string, type: ToastStatusEnum, title?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<React.ReactNode[]>([]);

  const showToast = (message: string, type: ToastStatusEnum, title?: string, duration?: number) => {

    const newToast = (
      <Toast
        key={Date.now()} message={message} type={type}
        onClose={() => removeToast(newToast)} title={title} duration={duration}
      />
    );

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (toast: React.ReactNode) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t !== toast));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="flex flex-col-reverse gap-4 fixed bottom-4 transition-all
                      left-0 sm:left-4 w-full px-4 sm:px-0 z-[800]">
        {toasts}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
