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
        <div className="flex flex-col divide-y text-sc-blue-normal">
            {selectionData.map((item, index) => (
                <div
                    className="w-full py-1"
                    key={index}>
                    <button
                        className={`transition-all hover:bg-sc-purple-normal rounded-md w-full ${selectedValue === item.value && 'bg-sc-purple-normal'}`}
                        onClick={() => selectionDone(item)}>
                        {item.name === '0' ? 'سایر' : item.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AddressSelectContent;
