import { useEffect, useState } from 'react';

interface SignProps {
    name: string;
    title: string;
    index: number;
    specialSign: boolean;
}

interface CutSideSignProps {
    type: string;
    signs: SignProps[];
    selectedValueIndex: number;
    onSelection: (type: string, sign: SignProps) => void;
}

const CutSideSign = ({ type, signs, onSelection, selectedValueIndex }: CutSideSignProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(selectedValueIndex);
    }, [selectedValueIndex]);
    return (
        <div className="flex flex-col divide-y text-sc-blue-normal r2l">
            {signs.map((item, index) => (
                <div
                    className="w-full py-1"
                    key={index}>
                    <button
                        className={`transition-all hover:bg-sc-purple-normal rounded-md w-full p-2 text-sm md:text-base ${selectedIndex === item.index ? 'bg-sc-purple-normal' : ''}`}
                        onClick={() => onSelection(type, item)}>
                        {item.title}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CutSideSign;
