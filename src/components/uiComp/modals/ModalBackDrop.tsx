import { ReactNode } from "react";

interface ModalBaseCardProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalBackDrop = ({ children, onClose }: ModalBaseCardProps) => {
  return (
    <div className="font-peyda fixed inset-0 z-30 px-6 sm:px-0">
      <div className="flex items-center justify-center min-h-screen">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-50"
        ></div>

        {children}
      </div>
    </div>
  );
};

export default ModalBackDrop;
