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

    const [hasValue, setHasValue] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        if (props.errorMessage) {
            setErrorMessage(props.errorMessage);
        }
    }, [props.errorMessage]);

    useEffect(() => {
        if (props.getId) props.getId(uniqueId);
    }, [props.getId]);

    useEffect(() => {
        if (props.defaultValue) {
            setHasValue(true);
        } else {
            setHasValue(false);
        }
    }, [props.defaultValue]);

    return (
        <div className={`flex flex-col gap-1  ${props.fullWidth && 'w-full'}`}>
            <div className="relative">
                <input
                    id={uniqueId}
                    defaultValue={props.defaultValue}
                    type="text"
                    className={`bg-rasa-blue-25 appearance-none transition-all
                    outline-none focus:ring-0 
                    border hover:border-rasa-blue-250 
                    text-gray-800
                    rounded-lg px-2.5 pb-2 pt-4 w-full r2l peer 
                    ${props.hasError ? 'border-red-300 focus:border-red-400' : 'border-sc-gray-normal focus:border-sc-blue-normal'}`}
                    placeholder=" "
                    onChange={(e) => props.onValueChange(e.target.value)}
                />

                <label
                    htmlFor={uniqueId}
                    className={`absolute 
                    ${hasValue ? 'text-sc-purple-400' : 'text-sc-gray-normal'}
                  bg-white

                    peer-focus:text-sc-blue-normal
                    duration-150 transform -translate-y-1/2 
                    -top-0 right-3 z-10 

                    text-xs
                    peer-focus:text-rasa-purple-400 

                    peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                   
                    peer-focus:-top-1

                    rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-10 -start-3`}>
                    {`${props.label}`}
                </label>
            </div>
            {props.hasError && <p className="text-red-400 text-xs pr-1">{errorMessage ? errorMessage : `فیلد ${props.label} اجباری است`}</p>}
        </div>
    );
};

export default Input;
