import { ReactNode, useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { ButtonTypes } from '../../../enums/ButtonTypes';

interface ButtonProps {
    text: string | ReactNode;
    onClick: () => void;
    isBusy?: boolean;
    isDisabled?: boolean;
    fullWidth?: boolean;
    Type?: ButtonTypes;
    isOutlined?: boolean;
}

const Button = ({ text, onClick, isBusy = false, isDisabled = false, fullWidth = false, Type = undefined }: ButtonProps) => {
    const [_isDisabled, setIsDisabled] = useState(isDisabled);
    const [cssClass, setCssClass] = useState('primary');
    useEffect(() => {
        setIsDisabled(isDisabled || isBusy);
    }, [isDisabled, isBusy]);

    useEffect(() => {
        switch (Type) {
            case ButtonTypes.Info:
                setCssClass('info');
                break;
            case ButtonTypes.Success:
                setCssClass('success');
                break;
            case ButtonTypes.Error:
                setCssClass('error');
                break;
            case ButtonTypes.Brown:
                setCssClass('brown');
                break;
            case ButtonTypes.OulinedSuccess:
                setCssClass('outlined-success');
                break;
            case ButtonTypes.OulinedInfo:
                setCssClass('outlined-info');
                break;
            case ButtonTypes.OutlinedBrown:
                setCssClass('outlined-brown');
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
