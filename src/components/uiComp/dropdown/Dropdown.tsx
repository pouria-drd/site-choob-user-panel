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
    const arrowIconClass = isOpen ? 'w-6 h-6' : 'w-6 h-6 rotate-180';

    return (
        <div className="flex flex-col font-peyda text-sc-blue-normal w-full gap-2 ss02">
            {/* Dropdown header */}
            <div
                onClick={handleToggleClick}
                className="flex flex-col justify-between bg-sc-purple-normal transition-all outline-none hover:outline hover:outline-sc-blue-normal text-base rounded cursor-pointer w-full pb-3 divide-y">
                <span className="text-sc-gray-normal text-right py-1 px-4">{title}</span>
                <div className="flex items-center justify-between pl-6 pt-2 pr-4">
                    {/* Arrow icon indicating dropdown state */}
                    <ArrowUpIcon className={arrowIconClass} />

                    {/* Display selected option or title */}
                    <div className="flex items-center justify-end gap-2">
                        {selectedOption?.label || 'انتخاب کنید'}
                        {selectedOption?.icon && <span className="mr-2">{selectedOption.icon}</span>}
                    </div>
                </div>
            </div>

            {/* Dropdown content */}
            <div
                id="dropdown-content"
                ref={contentRef}
                style={{ height: isOpen ? `${contentHeight}px` : '0' }}
                className={`bg-sc-purple-normal flex flex-col divide-y divide-dashed divide-gray-400 text-sm rounded overflow-hidden transition-all outline-none  px-2 gap-1 ${isOpen ? 'py-2' : ''}`}>
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
