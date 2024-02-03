import { useEffect, useState } from "react";
import { ToastStatusEnum } from "./ToastProvider";

import TickIcon from "./icons/TickIcon";
import CloseIcon from "./icons/CloseIcon";
import AlertIcon from "./icons/AlertIcon";

import "./styles/Toast.css";

interface ToastProps {
    message: string;
    type: ToastStatusEnum;
    onClose: () => void;

    title?: string;
    duration?: number;
}

const Toast = ({ message, type, onClose, title, duration = 5000 }: ToastProps) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFadeOut(true);
        }, duration - 500); // Apply fadeOut 500ms before the duration ends

        return () => clearTimeout(timeoutId);
    }, [duration]);

    const handleAnimationEnd = () => {
        if (fadeOut && onClose) {
            onClose();
        }
    };

    const renderIcon = () => {
        switch (type) {
            case ToastStatusEnum.Success:
                return <TickIcon />;
            default:
                return <AlertIcon />;
        }
    };


    const loaderStyle = {
        '--toastDuration': `${duration / 1000}s`,
    } as React.CSSProperties;

    return (
        <div
            style={loaderStyle}
            className={`toast ${type} ${fadeOut ? "fadeOut" : "fadeIn"} r2l toast-progress`}
            onAnimationEnd={handleAnimationEnd}
        >
            <div className="grid grid-cols-6 place-items-center gap-x-2 gap-y-0 px-3">
                {title ?
                    <>
                        <div className="flex items-center col-span-6 gap-x-2.5 w-full">
                            <div className="col-span-1 flex-shrink">{renderIcon()}</div>
                            <h3 className="col-span-5 font-semibold text-lg w-full">
                                {title}
                            </h3>
                        </div>
                        <div className="col-span-1"></div>
                        <p className="col-span-5 text-sm text-black w-full">
                            {message}
                        </p>
                    </>
                    :
                    <>
                        <div className="flex items-center col-span-6 gap-x-2.5 w-full">
                            <div className="col-span-1">{renderIcon()}</div>
                            <h3 className="col-span-5 font-semibold text-lg">
                                {message}
                            </h3>
                        </div>
                    </>
                }
            </div>

            <button className="relative -left-2" onClick={() => setFadeOut(true)}>
                <CloseIcon />
            </button>
        </div>
    );
};

export default Toast;
