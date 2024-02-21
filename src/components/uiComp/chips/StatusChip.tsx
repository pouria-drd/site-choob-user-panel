import { ReactNode, useEffect, useState } from 'react';
import { StatusEnum } from '../../../enums/StatusEnum';

interface StatusChipProps {
    text: string | ReactNode;
    type?: StatusEnum;
}

const StatusChip = ({ text, type = StatusEnum.Info }: StatusChipProps) => {
    const [chipStyle, setChipStyle] = useState('bg-sc-purple-normal text-gray-400');

    useEffect(() => {
        switch (type) {
            case StatusEnum.Success:
                setChipStyle('bg-sc-green-100 text-sc-green-normal');
                break;
            case StatusEnum.Error:
                setChipStyle('bg-sc-red-200 text-sc-red-normal');
                break;
            case StatusEnum.Warning:
                setChipStyle('bg-sc-brown-500 text-sc-brown-800');
                break;
            case StatusEnum.Info:
                setChipStyle('bg-sc-purple-normal text-gray-400');
                break;
            default:
                setChipStyle('bg-sc-purple-normal text-gray-400');
        }
    }, [type]);

    return <div className={`flex items-center justify-center cursor-default px-4 py-1 w-fit rounded-xl  text-xs  ${chipStyle}`}>{text}</div>;
};

export default StatusChip;
