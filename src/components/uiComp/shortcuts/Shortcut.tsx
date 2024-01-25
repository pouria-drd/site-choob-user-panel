import { BASE_URL } from "../../../config";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ShortcutProps {
  text: string;
  to?: string;
  icon?: ReactNode;
  isInApp?: boolean;
}

const Shortcut = ({ text, to, icon, isInApp = true }: ShortcutProps) => {
  const navigate = useNavigate();

  const handleLink = () => {
    if (!to) return;

    if (!isInApp) {
      window.open(BASE_URL + to, "_self");
    } else {
      navigate(to);
    }
  };

  return (
    <div
      onClick={handleLink}
      className="flex items-center justify-center
       bg-sc-purple-normal text-sc-blue-normal font-peyda hover:shadow hover:outline-1 transition-all
        rounded-lg cursor-pointer w-full sm:w-fit px-4 py-2 gap-2"
    >
      <p>{text}</p>
      {icon && <span className="">{icon}</span>}
    </div>
  );
};

export default Shortcut;
