import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { StatusEnum } from '../../../enums/StatusEnum';

interface ButtonProps {
    text: string;
    onClick: () => void;
    isBusy?: boolean;
    isDisabled?: boolean;
    fullWidth?: boolean;
    Type?: StatusEnum;
}

const Button = ({ text, onClick, isBusy = false, isDisabled = false, fullWidth = false, Type = undefined }: ButtonProps) => {
    const [_isDisabled, setIsDisabled] = useState(isDisabled);
    const [cssClass, setCssClass] = useState('primary');
    useEffect(() => {
        setIsDisabled(isDisabled || isBusy);
    }, [isDisabled, isBusy]);

    useEffect(() => {
        switch (Type) {
            case StatusEnum.Info:
                setCssClass('info');
                break;
            case StatusEnum.Success:
                setCssClass('success');
                break;
            case StatusEnum.Error:
                setCssClass('error');
                break;
            case StatusEnum.Warning:
                setCssClass('warning');
                break;
            default:
                setCssClass('primary');
        }
    }, [Type]);

    return (
        <button
            onClick={onClick}
            disabled={_isDisabled}
            className={`base-button ${cssClass} ${fullWidth ? 'w-full' : 'w-auto'}`}>
            {text}
            {isBusy && (
                <span className="text-white">
                    <Spinner
                        color="#fff"
                        size={17}
                    />
                </span>
            )}
        </button>
    );
};

export default Button;
