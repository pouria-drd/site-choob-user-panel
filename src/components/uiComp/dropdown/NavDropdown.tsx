import { NavLink, useLocation } from 'react-router-dom';
import { useState, ReactNode, useEffect, useRef } from 'react';

import ArrowUpIcon from '../../icons/ArrowUpIcon';

interface NavLinks {
    to: string;
    label: string;
    icon?: ReactNode;
}

interface DropdownProps {
    navLinks: NavLinks[];
}

const NavDropdown = ({ navLinks }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState<NavLinks | null>(null);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation(); // Access the current route location

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        } else {
            setContentHeight(null);
        }
    }, [isOpen, navLinks]);

    useEffect(() => {
        // Find the option whose 'to' property matches the current route path
        const matchedOption = navLinks.find((option) => location.pathname === option.to);
        setSelectedLink(matchedOption || null);
    }, [navLinks]);

    const handleToggleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (option: NavLinks) => {
        setSelectedLink(option);
        //    setIsOpen(false);
    };

    const arrowIconClass = isOpen ? '' : 'rotate-180';

    return (
        <div className="flex flex-col font-peyda text-sc-blue-normal w-full gap-2 ss02">
            <div
                onClick={handleToggleClick}
                className="flex items-center justify-between bg-white hover:bg-gray-50 text-base rounded-lg transition-colors cursor-pointer w-full py-4 pl-6 pr-4">
                <ArrowUpIcon css={arrowIconClass} />

                <div className="flex items-center justify-end gap-2">
                    {selectedLink?.label}
                    {selectedLink?.icon && <span className="mr-2">{selectedLink.icon}</span>}
                </div>
            </div>

            <div
                id="dropdown-content"
                ref={contentRef}
                style={{ height: isOpen ? `${contentHeight}px` : '0' }}
                className="bg-white text-sm rounded-lg overflow-hidden transition-all px-2 mb-2">
                {navLinks.map((option) => (
                    <NavLink
                        key={option.label}
                        to={option.to}
                        onClick={() => handleLinkClick(option)}
                        className="flex justify-end hover:bg-sc-purple-normal rounded-lg cursor-pointer my-2 p-2 gap-4">
                        {option.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavDropdown;
