import { ReactNode } from 'react';

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
           bg-sc-purple-normal text-sc-blue-normal font-peyda hover:shadow-lg transition-all outline-0 hover:outline hover:outline-1 outline-sc-gray-normal hover:outline-sc-purple-400
            rounded-lg cursor-pointer w-full sm:w-52 px-4 py-2 gap-2">
            <p>{text}</p>
            {icon && <span className="">{icon}</span>}
        </div>
    );
};

export default EventShortcut;
