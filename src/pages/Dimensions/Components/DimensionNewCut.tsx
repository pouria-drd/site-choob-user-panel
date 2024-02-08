import { useEffect, useState } from 'react';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

import Button from '../../../components/uiComp/buttons/Button';
import DimensionService from '../../../services/DimensionService';
import UploadIcon from '../../../components/icons/UploadIcon';
import Modal from '../../../components/uiComp/modals/Modal';
import OptiCutImportContent from '../../../contents/dimensions/OptiCutImportContent';
import CutSign from './CutSign';

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
            x: formData.x,
            y: formData.y,
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
            document.getElementById('xInput')?.focus();
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

    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            addToTheList();
        }

        //WTF?
        /*   if (!formData.x) {
            setHasX('');
        } else {
            setHasX(`(${formData.x})`);
        }

        if (!formData.y) {
            setHasY('');
        } else {
            setHasY(`(${formData.y})`);
        }*/
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
                        <input
                            id="xInput"
                            className="base-input w-full"
                            placeholder="طول(سانتی متر)"
                            type="number"
                            min={0}
                            max={maxX}
                            value={formData.x == 0 ? '' : formData.x}
                            onChange={(e) => handleInputChange('x', e.target.value)}
                        />
                        <input
                            className="base-input  w-full"
                            placeholder="عرض(سانتی متر)"
                            type="number"
                            min={0}
                            max={maxY}
                            value={formData.y == 0 ? '' : formData.y}
                            onChange={(e) => handleInputChange('y', e.target.value)}
                        />
                        <input
                            className="base-input  w-full"
                            placeholder="تعداد"
                            type="number"
                            value={formData.count == 0 ? '' : formData.count}
                            onChange={(e) => handleInputChange('count', e.target.value)}
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
