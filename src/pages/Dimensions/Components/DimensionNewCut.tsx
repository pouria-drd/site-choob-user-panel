import { useEffect, useState } from 'react';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

import Button from '../../../components/uiComp/buttons/Button';
import DimensionService from '../../../services/DimensionService';
import UploadIcon from '../../../components/icons/UploadIcon';
import Modal from '../../../components/uiComp/modals/Modal';
import OptiCutImportContent from '../../../contents/dimensions/OptiCutImportContent';
import CutSign from './CutSign';
import NumberInput from '../../../components/uiComp/Inputs/NumberInput';

interface DimensionNewCutProps {
    dimensionId: string;
    woodSheetDimensions: string;
    onUpdate: () => void;
}

const DimensionNewCut = ({ dimensionId, woodSheetDimensions, onUpdate }: DimensionNewCutProps) => {
    const { showToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeOnUpdate = () => {
        setIsModalOpen(false);
        onUpdate();
    };

    const [isSubtractPVC, setSubtractPVC] = useState(false);

    const [widthInputId, setWidthInputId] = useState('');

    const dimensionService = new DimensionService();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState<DimensionCutModel>({
        x: 0,
        y: 0,
        count: 0,
        pvctop: false,
        pvcleft: false,
        pvcright: false,
        pvcbottom: false,
        xGroove: false,
        yGroove: false,
        xGazor: false,
        yGazor: false,
        fBottom: false,
        fLeft: false,
        fRight: false,
        fTop: false,
        details: '',
    });

    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);
    //   const [hasX, setHasX] = useState('');
    //    const [hasY, setHasY] = useState('');

    const addToTheList = async () => {
        if (!formData.x) {
            showToast('طول را وارد کنید', ToastStatusEnum.Error, 'خطا');
            return;
        }
        if (!formData.y) {
            showToast('عرض را وارد کنید', ToastStatusEnum.Error, 'خطا');
            return;
        }
        if (!formData.count) {
            showToast('تعداد را وارد کنید', ToastStatusEnum.Error, 'خطا');
            return;
        }

        const addData = {
            dimensionId: dimensionId,
            x: checkForPVCSubtract(formData.x, 'width'),
            y: checkForPVCSubtract(formData.y, 'height'),
            count: formData.count,
            pvcTop: formData.pvctop,
            pvcLeft: formData.pvcleft,
            pvcRight: formData.pvcright,
            pvcBottom: formData.pvcbottom,
            xGroove: formData.xGroove,
            yGroove: formData.yGroove,
            xGazor: formData.xGazor,
            yGazor: formData.yGazor,
            fBottom: formData.fBottom,
            fLeft: formData.fLeft,
            fRight: formData.fRight,
            fTop: formData.fTop,
            details: formData.details,
        };

        try {
            setIsProcessing(true);

            const result = await dimensionService.AddNewCutDimension<any>(addData);
            showToast(result.message, ToastStatusEnum.Success, 'عملیات موفقیت آمیزبود');

            setFormData({
                x: 0,
                y: 0,
                count: 0,
                pvctop: false,
                pvcleft: false,
                pvcright: false,
                pvcbottom: false,
                xGroove: false,
                yGroove: false,
                xGazor: false,
                yGazor: false,
                fBottom: false,
                fLeft: false,
                fRight: false,
                fTop: false,
                details: '',
            });
            onUpdate();
            document.getElementById(widthInputId)?.focus();
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error, 'خطا');
        }
        setIsProcessing(false);
    };

    const handleInputChange = (fieldName: keyof DimensionCutModel, value: string | number | boolean | undefined) => {
        if (fieldName === 'x') {
            if (value) if (Number(value) > maxX) return;
        }

        if (fieldName === 'y') {
            if (value) if (Number(value) > maxY) return;
        }
        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: value,
            };
        });
    };

    const checkForPVCSubtract = (value: number, planeSide: 'width' | 'height') => {
        if (!isSubtractPVC) return value;

        let totalSubCount = 0;
        if (planeSide === 'width') {
            //check for dto pvc sides
            if (formData.pvcright) totalSubCount = totalSubCount + 1;
            if (formData.pvcleft) totalSubCount = totalSubCount + 1;
        } else {
            //check for dto pvc sides
            if (formData.pvctop) totalSubCount = totalSubCount + 1;
            if (formData.pvcbottom) totalSubCount = totalSubCount + 1;
        }

        //subtract pvc thickness
        return (value - totalSubCount * 0.2).toFixed(1);
    };

    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            addToTheList();
        }
    };

    useEffect(() => {
        setMaxX(Number(woodSheetDimensions.split('*')[1]));
        setMaxY(Number(woodSheetDimensions.split('*')[0]));
    }, [woodSheetDimensions]);

    return (
        <>
            <div
                onKeyUp={handleKeyUp}
                className="flex flex-col bg-white rounded-lg w-full px-2 py-2 sm:px-4  gap-4 h-full">
                <div className="flex justify-between items-center border-b py-2">
                    <Button
                        Type={ButtonTypes.Info}
                        onClick={openModal}
                        text={
                            <div className="flex gap-1 items-center text-xs sm:text-sm">
                                <p className="r2l">بارگذاری فایل OptiCut</p>

                                <UploadIcon size={18} />
                            </div>
                        }
                    />

                    <h5 className="font-bold text-sm sm:text-base">برش جدید</h5>
                </div>
                <div className="flex flex-col md:flex-row-reverse gap-2 items-center justify-between">
                    <div className="flex flex-col flex-wrap justify-between md:flex-row gap-4 w-full md:w-1/2 r2l">
                        <div className="flex flex-row items-center gap-1">
                            <input
                                className="base-input w-full"
                                type="checkbox"
                                checked={isSubtractPVC}
                                onChange={(e) => {
                                    setSubtractPVC(e.target.checked);
                                }}
                            />
                            <label className="text-xs sm:text-sm md:text-base">PVC کسر شود (2mm)</label>
                        </div>
                        <NumberInput
                            fullWidth={true}
                            label="طول"
                            type="cm"
                            value={formData.x}
                            getId={(id) => {
                                setWidthInputId(id);
                            }}
                            onValueChange={(v) => handleInputChange('x', v)}
                        />

                        <NumberInput
                            fullWidth={true}
                            label="عرض"
                            type="cm"
                            value={formData.y}
                            onValueChange={(v) => handleInputChange('y', v)}
                        />

                        <NumberInput
                            fullWidth={true}
                            label="تعداد"
                            type="count"
                            value={formData.count}
                            onValueChange={(v) => handleInputChange('count', v)}
                        />

                        <input
                            className="base-input  w-full"
                            placeholder="توضیحات(اختیاری)"
                            type="text"
                            maxLength={15}
                            value={formData?.details}
                            onChange={(e) => handleInputChange('details', e.target.value)}
                        />
                    </div>

                    <div className="col-span-6 md:col-span-3 mt-2 flex items-center justify-center">
                        <CutSign
                            dimension={formData}
                            onUpdate={(data) => {
                                setFormData(data);
                            }}
                        />
                    </div>
                </div>
                <div className="hidden md:block">
                    <Button
                        text="افزودن"
                        onClick={addToTheList}
                        isBusy={isProcessing}
                    />
                </div>

                <div className="block md:hidden">
                    <Button
                        text="افزودن"
                        fullWidth={true}
                        onClick={addToTheList}
                        isBusy={isProcessing}
                    />
                </div>
            </div>

            <Modal
                title={'بارگذاری از OptiCut'}
                isOpen={isModalOpen}
                onClose={closeModal}>
                <OptiCutImportContent
                    dimensionId={dimensionId}
                    onSuccess={closeOnUpdate}
                />
            </Modal>
        </>
    );
};

export default DimensionNewCut;
