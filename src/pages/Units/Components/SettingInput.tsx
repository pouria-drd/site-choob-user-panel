import { useEffect, useState } from 'react';
import { InputTypes } from '../../../enums/InputTypes';

function SettingInput({ valueType, value, isDisabled, onValueChange }: { valueType: string; value: any; isDisabled: boolean; onValueChange: (v: any) => void }) {
    const [inputType, setInputType] = useState<InputTypes>(InputTypes.Number);

    const handleInputChange = (v: any) => {
        if (!v) onValueChange(1);
        if (/^\d+$/.test(v)) onValueChange(v);
    };

    const handleCheckBoxInputChanged = (v: any) => {
        onValueChange(v);
    };
    useEffect(() => {
        if (valueType === 'mm' || valueType === 'cm') setInputType(InputTypes.Number);
        else if (valueType === 'bool') setInputType(InputTypes.Bool);
    }, [valueType]);
    return (
        <>
            {inputType == InputTypes.Number ? (
                <input
                    type="number"
                    className="base-input w-14 md:w-20"
                    value={value}
                    min={1}
                    onChange={(e) => handleInputChange(e.target.value)}
                    readOnly={isDisabled}
                />
            ) : (
                <div className="flex flex-row gap-2 text-xs md:text-sm  pl-6  bg-sc-purple-normal items-center justify-between p-2 rounded w-14 md:w-20">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleCheckBoxInputChanged(!value)}
                        readOnly={isDisabled}
                        disabled={isDisabled}
                    />
                    <label>{value === 1 ? 'بله' : 'خیر'}</label>
                </div>
            )}
        </>
    );
}

export default SettingInput;
