import { useState } from 'react';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';

import Button from '../../components/uiComp/buttons/Button';
import DimensionService from '../../services/DimensionService';

import DownloadIcon from '../../components/icons/DownloadIcon';
import Input from '../../components/uiComp/Inputs/Input';

import Cutmaster from '../../assets/images/cutmaster.gif';

interface exportCutmasterDTO {
    dimensionId: string;
    sideType: string;
    sideSign: string;
}
const CutMasterExport = ({ dimensionID, onSuccess }: { dimensionID: string; onSuccess: () => void }) => {
    const { showToast } = useToast();

    const [isProcessing, setIsProcessing] = useState(false);

    const defaultDTO: exportCutmasterDTO = {
        dimensionId: dimensionID,
        sideType: 'ABS',
        sideSign: '#',
    };

    const [dto, setDTO] = useState<exportCutmasterDTO>(defaultDTO);

    const dimensionService = new DimensionService();

    const handleInputChange = (fieldName: keyof exportCutmasterDTO, value: string) => {
        setDTO((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const handleCopyButtonClick = async () => {
        setIsProcessing(true);

        try {
            var result: boolean = await dimensionService.DownloadCutmasterExport(dto);

            if (result) {
                showToast('فایل خروجی درحال دانلود می باشد.', ToastStatusEnum.Success);
                onSuccess();
            } else {
                showToast('مشکلی پیش آمده است.', ToastStatusEnum.Error);
            }
            setIsProcessing(false);
        } catch {
            showToast('مشکلی پیش آمده است.', ToastStatusEnum.Error);
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 r2l mt-5">
            <div className="flex items-start text-justify gap-2 text-xs md:text-sm">
                <img src={Cutmaster} />
                <p>برای دریافت فایل کاتمستر کافی است تنظیمات مدنظر خود برای نوار PVC را در فیلد های زیر وارد کنید.</p>
            </div>
            <p className="text-sc-red-900 text-xs">دقت کنید که خروجی به بزرگ و کوچک بودن حروف حساس است!</p>
            <Input
                label="نشان پی وی سی - (Band Type)"
                defaultValue={dto.sideType}
                onValueChange={(v) => handleInputChange('sideType', v)}
            />
            <Input
                label="علامت روی نقشه (Mark on layout)"
                defaultValue={dto.sideSign}
                onValueChange={(v) => handleInputChange('sideSign', v)}
            />

            <Button
                text={
                    <div className="flex items-center justify-center">
                        <DownloadIcon /> دانلود
                    </div>
                }
                onClick={handleCopyButtonClick}
                fullWidth={true}
                isDisabled={!dto.sideSign || !dto.sideType}
                isBusy={isProcessing}
            />
        </div>
    );
};

export default CutMasterExport;
