import { BASE_URL } from '../../../config';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
            window.open(BASE_URL + to, '_self');
        } else {
            navigate(to);
        }
    };

    return (
        <div
            onClick={handleLink}
            className="flex items-center justify-center
            bg-sc-purple-normal text-sc-blue-normal font-peyda hover:shadow-lg transition-all outline-0 hover:outline hover:outline-1 outline-sc-gray-normal hover:outline-sc-purple-400
             rounded-lg cursor-pointer w-full sm:w-52 px-4 py-2 gap-2">
            <p>{text}</p>
            {icon && <span className="">{icon}</span>}
        </div>
    );
};

export default Shortcut;
