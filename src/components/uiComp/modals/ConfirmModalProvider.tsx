import { createContext, useContext, ReactNode, useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface ConfirmModalContextProps {
  showConfirmModal: (
    question: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      isDanger?: boolean;
      ConfirmText?: string;
      CancelText?: string;
    }
  ) => void;
  hideConfirmModal: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextProps | undefined>(
  undefined
);

interface ConfirmModalProviderProps {
  children: ReactNode;
}

export const ConfirmModalProvider = ({
  children,
}: ConfirmModalProviderProps) => {
  const [confirmModal, setConfirmModal] = useState<ReactNode | null>(null);

  const showConfirmModal = (
    question: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      isDanger?: boolean;
      ConfirmText?: string;
      CancelText?: string;
    }
  ) => {
    const confirmModalComponent = (
      <ConfirmModal
        key={Date.now()}
        question={question}
        onConfirm={() => {
          onConfirm();
          hideConfirmModal();
        }}
        onCancel={() => {
          if (onCancel) {
            onCancel();
          }
          hideConfirmModal();
        }}
        isDanger={options?.isDanger}
        ConfirmText={options?.ConfirmText}
        CancelText={options?.CancelText}
      />
    );

    setConfirmModal(confirmModalComponent);
  };

  const hideConfirmModal = () => {
    setConfirmModal(null);
  };

  return (
    <ConfirmModalContext.Provider
      value={{ showConfirmModal, hideConfirmModal }}
    >
      {children}
      {confirmModal}
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error(
      "useConfirmModal must be used within a ConfirmModalProvider"
    );
  }
  return context;
};
