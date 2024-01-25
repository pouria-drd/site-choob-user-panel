import "./Toast.css";

import { useEffect, useState } from "react";
import { StatusEnum } from "../../../enums/StatusEnum";

import TickIcon from "../../icons/TickIcon";
import CloseIcon from "../../icons/CloseIcon";
import AlertIcon from "../../icons/AlertIcon";

interface ToastProps {
  message: string;
  type: StatusEnum;
  title?: string;
  onClose?: () => void;
  duration?: number;
}

const Toast = ({
  type,
  title,
  message,
  onClose = () => {},
  duration = 4000,
}: ToastProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFadeOut(true);
    }, duration - 300); // Apply fadeOut 300ms before the duration ends

    return () => clearTimeout(timeoutId);
  }, [duration]);

  const handleAnimationEnd = () => {
    if (fadeOut) {
      onClose();
    }
  };

  const renderIcon = () => {
    switch (type) {
      case StatusEnum.Success:
        return <TickIcon />;
      default:
        return <AlertIcon />;
    }
  };

  return (
    <div
      className={`toast ${type} ${fadeOut ? "fadeOut" : "fadeIn"} r2l`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="grid grid-cols-6 place-items-center gap-x-2 gap-y-0 px-3">
        {title && (
          <>
            <div className="flex items-center col-span-6 gap-x-2.5 w-full">
              <div className="col-span-1 flex-shrink">{renderIcon()}</div>
              <h3 className="col-span-5 font-semibold text-base sm:text-lg">
                {title}
              </h3>
            </div>
            <div className="col-span-1"></div>
            <p className="col-span-5 text-black text-sm sm:text-base">
              {message}
            </p>
          </>
        )}

        {!title && (
          <>
            <div className="flex items-center col-span-6 gap-x-2.5 w-full">
              <div className="col-span-1">{renderIcon()}</div>
              <h3 className="col-span-5 font-semibold text-base sm:text-lg">
                {message}
              </h3>
            </div>
          </>
        )}
      </div>

      <button className="relative -left-2" onClick={() => setFadeOut(true)}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Toast;
