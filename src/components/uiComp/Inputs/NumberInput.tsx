import { useEffect, useId, useState } from 'react';

interface NumberInporProps {
    label: string;
    value: number;
    defaultValue?: number;
    type: 'cm' | 'mm' | 'count';
    fullWidth?: boolean;
    className?: string;
    hasError?: boolean;
    errorMessage?: string;
    getId?: (id: string) => void;
    onValueChange: (value: number) => void;
}

const NumberInput = (props: NumberInporProps) => {
    const uniqueId = `numberInput${useId()}`;
    const [isOnFocus, setIsOnFocus] = useState(false);
    const [labelFocusType, setLabelFocusType] = useState('سانتی متر');
    const [labelType, setLabelType] = useState('cm');

    const [errorMessage, setErrorMessage] = useState<string>();

    const [value, setValue] = useState<number>(props.value);

    useEffect(() => {
        switch (props.type) {
            case 'cm':
                setLabelFocusType('(سانتی متر)');
                setLabelType('(cm)');
                break;
            case 'mm':
                setLabelFocusType('(میلی متر)');
                setLabelType('(mm)');
                break;
            case 'count':
                setLabelFocusType('');
                setLabelType('');
                break;
        }

        setValue(props.value);
    }, [props.value]);

    useEffect(() => {
        if (props.errorMessage) {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    useEffect(() => {
        if (props.getId) props.getId(uniqueId);
    }, [props.getId]);

    return (
        <div className={`flex flex-col gap-1 ${props.fullWidth && 'w-full'}`}>
            <div className="relative">
                <input
                    type="number"
                    id={uniqueId}
                    className={`block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border  appearance-none focus:outline-none focus:ring-0 hover:border-sc-purple-400 focus:border-sc-purple-400 peer ${props.hasError ? 'border-red-300 focus:border-red-400' : 'border-sc-gray-normal focus:border-sc-purple-400'} ${props.className}`}
                    placeholder=" "
                    onFocus={() => setIsOnFocus(true)}
                    onBlur={() => setIsOnFocus(false)}
                    onChange={(e) => props.onValueChange(Number(e.target.value))}
                    value={value}
                    onWheel={(event) => event.currentTarget.blur()}
                />
                <label
                    htmlFor={uniqueId}
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sc-purple-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-10 start-1 peer-focus:-start-3">
                    {`${props.label} ${isOnFocus ? labelFocusType : labelType}`}
                </label>
            </div>
            {props.hasError && <p className="text-red-400 text-xs pr-1">{errorMessage ? errorMessage : `فیلد ${props.label} اجباری است`}</p>}
        </div>
    );
};

export default NumberInput;
