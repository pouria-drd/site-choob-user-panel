import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isBusy?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  text,
  onClick,
  isBusy = false,
  isDisabled = false,
  fullWidth = false,
}: ButtonProps) => {
  const [_isDisabled, setIsDisabled] = useState(isDisabled);

  useEffect(() => {
    setIsDisabled(isDisabled || isBusy);
  }, [isDisabled, isBusy]);

  return (
    <button
      onClick={onClick}
      disabled={_isDisabled}
      className={`bg-sc-blue-normal hover:bg-blue-900 transition-all disabled:cursor-not-allowed disabled:bg-sc-gray-normal text-white text-sm sm:text-base flex items-center justify-center rounded-xl px-2 sm:px-4 py-2 
      ${fullWidth ? "w-full" : "w-24 sm:w-28"}`}
    >
      {text}
      {isBusy && (
        <span className="text-white">
          <Spinner color="#fff" size={17} />
        </span>
      )}
    </button>
  );
};

export default Button;
