import { ReactNode } from "react";

interface EventShortcutProps {
  text: string;
  icon?: ReactNode;
  event: () => void;
}

const EventShortcut = ({ text, event, icon }: EventShortcutProps) => {
  return (
    <div
      onClick={event}
      className="flex items-center justify-center
           bg-sc-purple-normal text-sc-blue-normal font-peyda hover:shadow hover:outline-1 transition-all
            rounded-lg cursor-pointer w-full sm:w-fit px-4 py-2 gap-2"
    >
      <p>{text}</p>
      {icon && <span className="">{icon}</span>}
    </div>
  );
};

export default EventShortcut;
