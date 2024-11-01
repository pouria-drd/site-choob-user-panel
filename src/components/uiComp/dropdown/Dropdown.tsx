import { useState, ReactNode, useEffect, useRef } from 'react';

import ArrowUpIcon from '../../icons/ArrowUpIcon';

/**
 * Interface for individual dropdown options
 */
interface DropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

/**
 * Props interface for the Dropdown component
 */
interface DropdownProps {
    title: string; // Title for the dropdown
    options: DropdownOption[]; // Array of dropdown options
    defaultOption?: DropdownOption; // Default selected option
    onSelectOption?: (option: DropdownOption) => void; // Callback function when an option is selected
}

/**
 * Dropdown component that provides a selectable list of options
 * @param {DropdownProps} props - The props for the Dropdown component
 * @returns {JSX.Element} The rendered Dropdown component
 */
const Dropdown = ({ title, options, defaultOption, onSelectOption }: DropdownProps) => {
    // State to track the dropdown's visibility
    const [isOpen, setIsOpen] = useState(false);

    // State to track the currently selected option
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(defaultOption || null);

    // State to track the height of the dropdown content
    const [contentHeight, setContentHeight] = useState<number | null>(null);

    // Reference to the DOM element representing the dropdown content
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Effect to update the content height when the dropdown is active
    useEffect(() => {
        if (isOpen && contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        } else {
            setContentHeight(null);
        }
    }, [isOpen, options]);

    // Effect to set the default option when it changes
    useEffect(() => {
        setSelectedOption(defaultOption || null);
    }, [defaultOption]);

    // Handler to toggle the visibility of the dropdown
    const handleToggleClick = (): void => {
        setIsOpen(!isOpen);
    };

    // Handler when an option is clicked
    const handleOptionClick = (option: DropdownOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelectOption) onSelectOption(option);
    };

    // CSS class for the arrow icon, rotated if the dropdown is active
    const arrowIconClass = isOpen ? 'w-3 h-3 ' : 'w-3 h-3 rotate-180 text-sc-gray-normal';

    return (
        <div className="flex flex-col font-peyda text-sc-blue-normal w-full gap-2 ss02 l2r pt-1">
            {/* Dropdown header */}
            <div
                onClick={handleToggleClick}
                className={`relative flex flex-col justify-between transition-all border  text-base rounded-lg cursor-pointer w-full pb-3 ${isOpen ? 'border-sc-blue-normal' : 'border-sc-gray-normal'}`}>
                <span className="absolute text-xs bg-white -top-3 text-gray-600 right-2 px-1">{title}</span>
                <div className="flex items-center justify-between pl-6 pt-2 pr-4">
                    {/* Arrow icon indicating dropdown state */}
                    <ArrowUpIcon className={arrowIconClass} />

                    {/* Display selected option or title */}
                    <span className={`flex items-center justify-end gap-2 text-sm pt-1 ${!selectedOption && 'text-sc-gray-normal'}  ${isOpen && 'text-sc-blue-normal'}`}>
                        {selectedOption?.label || 'انتخاب کنید'}
                        {selectedOption?.icon && <span className="mr-2">{selectedOption.icon}</span>}
                    </span>
                </div>
            </div>

            {/* Dropdown content */}
            <div
                id="dropdown-content"
                ref={contentRef}
                style={{ height: isOpen ? `${contentHeight}px` : '0' }}
                className={`flex flex-col  bg-sc-purple-normal divide-gray-400  border-sc-gray-normal text-sm rounded-lg overflow-hidden transition-all outline-none  px-2 gap-1 ${isOpen ? 'py-2' : ''}`}>
                {options.map((option) => (
                    <div
                        key={option.label}
                        onClick={() => handleOptionClick(option)}
                        className={`flex items-center last:mb-3 justify-center hover:bg-gray-50 rounded-lg cursor-pointer gap-4 p-2 ${option === selectedOption ? 'bg-white' : ''}`}>
                        {option.label}
                        {/* {option.icon && <span className="mr-2">{option.icon}</span>} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
