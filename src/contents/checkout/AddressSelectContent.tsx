import { useEffect } from 'react';

interface AddressSelectProps {
    selectionData: AddressSelectInputProp[];
    selectionType: string;
    selectedValue?: number;
    onSelect: (selectionT: string, item: any) => void;
}

const AddressSelectContent = ({ selectionData, selectionType, onSelect, selectedValue = 0 }: AddressSelectProps) => {
    useEffect(() => {}, [selectionData, selectionType]);

    const selectionDone = (item: any) => {
        onSelect(selectionType, item);
    };

    return (
        <div className="flex flex-col divide-y">
            {selectionData.map((item, index) => (
                <div className="w-full py-1">
                    <button
                        className={`hover:bg-sc-purple-normal rounded-md w-full ${selectedValue === item.value && 'bg-sc-purple-normal'}`}
                        onClick={() => selectionDone(item)}
                        key={index}>
                        {item.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AddressSelectContent;
