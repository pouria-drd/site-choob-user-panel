import { ReactNode, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowUpIcon from '../icons/ArrowUpIcon';

interface ItemChild {
    to: string;
    label: string;
}

interface SidebarItemProps {
    to?: string;
    label: string;
    icon: ReactNode;
    isActive: boolean;
    items?: ItemChild[];
    onClick?: () => void;
}

function SidebarItem({ label, icon, isActive, to, items, onClick }: SidebarItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(isActive);
    }, [isActive]);
    return (
        <div className={`text-gray-500 flex flex-col font-peyda transition-all duration-75 text-lg rounded-lg w-full p-2`}>
            {items ? (
                <div className="flex flex-col w-full gap-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex justify-between items-center hover:text-sc-blue-normal">
                        <span className={isOpen ? 'rotate-180' : '-rotate-90'}>
                            <ArrowUpIcon className={isActive ? 'w-3 h-3 text-sc-blue-normal' : 'w-3 h-3'} />
                        </span>
                        <div className="flex items-center justify-end  gap-3 p-2">
                            <h3 className={`${isActive && 'font-semibold text-sc-blue-normal'}`}>{label}</h3>
                            <span className="text-sc-blue-normal ">{icon}</span>
                        </div>
                    </button>

                    <div className={`flex flex-col gap-1 ${isOpen ? 'h-fit' : 'hidden'}`}>
                        {items.map((item, index) => (
                            <NavLink
                                onClick={onClick}
                                key={index}
                                to={item.to}
                                className="hover:text-sc-blue-normal text-base  flex items-center justify-end rounded-lg transition-all w-full gap-2 px-2 py-1">
                                <h3 className="mr-8">{item.label}</h3>
                            </NavLink>
                        ))}
                    </div>
                </div>
            ) : (
                <NavLink
                    onClick={onClick}
                    to={to ?? ''}
                    className="hover:text-sc-blue-normal flex items-center justify-end rounded-lg transition-all gap-3 p-2">
                    <h3 className={`${isActive && 'font-semibold text-sc-blue-normal'}`}>{label}</h3>
                    <span className="text-sc-blue-normal">{icon}</span>
                </NavLink>
            )}
        </div>
    );
}

export default SidebarItem;
