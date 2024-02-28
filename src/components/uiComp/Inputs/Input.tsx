import { useEffect, useId, useState } from 'react';

interface NumberInporProps {
    label: string;
    defaultValue?: string;
    fullWidth?: boolean;
    className?: string;
    hasError?: boolean;
    errorMessage?: string;
    getId?: (id: string) => void;
    onValueChange: (value: string) => void;
}

const Input = (props: NumberInporProps) => {
    const uniqueId = `numberInput${useId()}`;

    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        if (props.errorMessage) {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    useEffect(() => {
        if (props.getId) props.getId(uniqueId);
    }, [props.getId]);

    return (
        <div className={`flex flex-col gap-1  ${props.fullWidth && 'w-full'}`}>
            <div className="relative">
                <input
                    type="text"
                    id={uniqueId}
                    defaultValue={props.defaultValue}
                    className={`block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border  appearance-none focus:outline-none focus:ring-0 hover:border-sc-purple-400 focus:border-sc-purple-400 peer ${props.hasError ? 'border-red-300 focus:border-red-400' : 'border-sc-gray-normal focus:border-sc-purple-400'} ${props.className}`}
                    placeholder=" "
                    onChange={(e) => props.onValueChange(e.target.value)}
                />
                <label
                    htmlFor={uniqueId}
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-150 transform -translate-y-4 scale-75 top-2 z-10  bg-white   peer-focus:px-0 peer-focus:text-sc-purple-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:left-10 start-1 ">
                    {props.label}
                </label>
            </div>
            {props.hasError && <p className="text-red-400 text-xs pr-1">{errorMessage ? errorMessage : `فیلد ${props.label} اجباری است`}</p>}
        </div>
    );
};

export default Input;
