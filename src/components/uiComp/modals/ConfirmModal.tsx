import ModalBackDrop from "./ModalBackDrop";
import AlertIcon from "../../icons/AlertIcon";
import CloseIcon from "../../icons/CloseIcon";

interface ConfirmModalProps {
  question: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDanger?: boolean;
  ConfirmText?: string;
  CancelText?: string;
}

const ConfirmModal = ({
  onCancel,
  onConfirm,
  question,
  isDanger = false,
  ConfirmText = "تایید",
  CancelText = "لغو",
}: ConfirmModalProps) => {
  return (
    <>
      <ModalBackDrop onClose={onCancel}>
        <div className="bg-sc-purple-100 flex flex-col items-center justify-start rounded relative z-20 w-full max-w-lg sm:w-auto sm:min-w-[420px] mx-auto p-6 gap-6">
          <div className="flex justify-end items-start text-sc-blue-normal gap-3 w-full">
            <p className="text-black sm:text-lg r2l">{question}</p>
            <span className={`${isDanger ? "text-sc-red-900" : ""}`}>
              <AlertIcon />
            </span>
          </div>

          <div className="flex justify-start gap-3 w-full">
            <button
              className={`base-button ${isDanger ? "error" : "primary"}`}
              onClick={onConfirm}
            >
              {ConfirmText}
            </button>

            <button className={`base-button outlined`} onClick={onCancel}>
              {CancelText}
            </button>
          </div>

          <button
            className="absolute left-4 top-4 text-sc-purple-400"
            onClick={onCancel}
          >
            <CloseIcon />
          </button>
        </div>
      </ModalBackDrop>
    </>
  );
};

export default ConfirmModal;
