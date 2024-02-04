import { useEffect, useState } from 'react';

function DoorColorSelect({ title, index, onValueChanged }: { title: string; index: number; onValueChanged: (value: string, index: number) => void }) {
    useEffect(() => {}, [title, index]);

    const [selectedOption, setSelectedOptions] = useState(1);
    const valueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'color1') {
            onValueChanged('رنگ 1', index);
            setSelectedOptions(1);
        } else {
            onValueChanged('رنگ 2', index);
            setSelectedOptions(2);
        }
    };

    return (
        <div className="flex items-center justify-between text-xs md:text-sm gap-2 bg-sc-purple-normal px-2 py-3 rounded-md">
            <h6 className="px-2 whitespace-nowrap ">{title}:</h6>
            <fieldset className="flex items-center  gap-2 w-full justify-between r2l">
                <div className="flex gap-1 w-full items-center">
                    <input
                        type="radio"
                        name={`colorOption${index}`}
                        id="color1"
                        onChange={valueChanged}
                        checked={selectedOption == 1 ? true : false}
                    />
                    <label
                        className={selectedOption == 1 ? 'text-sc-blue-normal' : 'text-gray-600'}
                        htmlFor="color1">
                        رنگ 1
                    </label>
                </div>
                <div className="flex gap-1 w-full items-center">
                    <input
                        type="radio"
                        name={`colorOption${index}`}
                        id="color2"
                        onChange={valueChanged}
                        checked={selectedOption == 2 ? true : false}
                    />
                    <label
                        className={selectedOption == 2 ? 'text-sc-blue-normal' : 'text-gray-600'}
                        htmlFor="color2">
                        رنگ 2
                    </label>
                </div>
            </fieldset>
        </div>
    );
}

export default DoorColorSelect;
