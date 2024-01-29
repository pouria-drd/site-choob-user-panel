import { useState } from 'react';
import { StatusEnum } from '../../../enums/StatusEnum';
import { useToast } from '../../../components/uiComp/toasts/ToastProvider';

import CutPlane from '../../../contents/dimensions/CutPlane';
import Button from '../../../components/uiComp/buttons/Button';
import DimensionService from '../../../services/DimensionService';
import UploadIcon from '../../../components/icons/UploadIcon';
import { ButtonTypes } from '../../../enums/ButtonTypes';
import Modal from '../../../components/uiComp/modals/Modal';
import OptiCutImportContent from '../../../contents/dimensions/OptiCutImportContent';

interface DimensionNewCutProps {
    dimensionId: string;
    onUpdate: () => void;
}

const DimensionNewCut = ({ dimensionId, onUpdate }: DimensionNewCutProps) => {
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
        details: '',
    });

    const [hasX, setHasX] = useState('');
    const [hasY, setHasY] = useState('');

    const addToTheList = async () => {
        if (!formData.x) {
            showToast('طول را وارد کنید', StatusEnum.Error, 'خطا');
            return;
        }
        if (!formData.y) {
            showToast('عرض را وارد کنید', StatusEnum.Error, 'خطا');
            return;
        }
        if (!formData.count) {
            showToast('تعداد را وارد کنید', StatusEnum.Error, 'خطا');
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
            details: formData.details,
        };

        try {
            setIsProcessing(true);

            const result = await dimensionService.AddNewCutDimension<any>(addData);
            showToast(result.message, StatusEnum.Success, 'عملیات موفقیت آمیزبود');

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
                details: '',
            });
            onUpdate();
            document.getElementById('xInput')?.focus();
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, StatusEnum.Error, 'خطا');
        }
        setIsProcessing(false);
    };

    const handleInputChange = (fieldName: keyof DimensionCutModel, value: string | number | boolean | undefined) => {
        setFormData((prevData) => {
            // Ensure that xGroove or yGroove cannot be true when xGazor or yGazor are true, and vice versa
            if ((fieldName === 'xGroove' || fieldName === 'yGroove') && value === true) {
                return {
                    ...prevData,
                    xGroove: fieldName === 'xGroove' && !prevData.xGazor,
                    yGroove: fieldName === 'yGroove' && !prevData.yGazor,
                    xGazor: false,
                    yGazor: false,
                    [fieldName]: value,
                };
            } else if ((fieldName === 'xGazor' || fieldName === 'yGazor') && value === true) {
                return {
                    ...prevData,
                    xGazor: fieldName === 'xGazor' && !prevData.xGroove,
                    yGazor: fieldName === 'yGazor' && !prevData.yGroove,
                    xGroove: false,
                    yGroove: false,
                    [fieldName]: value,
                };
            } else {
                return {
                    ...prevData,
                    [fieldName]: value,
                };
            }
        });
    };

    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            addToTheList();
        }

        if (!formData.x) {
            setHasX('');
        } else {
            setHasX(`(${formData.x})`);
        }

        if (!formData.y) {
            setHasY('');
        } else {
            setHasY(`(${formData.y})`);
        }
    };

    return (
        <>
            <div
                onKeyUp={handleKeyUp}
                className="flex flex-col bg-white rounded-lg w-full px-2 py-6 sm:p-6 gap-4 h-full">
                <div className="flex justify-between items-center border-b py-2">
                    <Button
                        Type={ButtonTypes.Info}
                        onClick={openModal}
                        text={
                            <div className="flex gap-1 items-center text-xs sm:text-sm">
                                <p>بارگذاری فایل OptiCut</p>

                                <UploadIcon size={18} />
                            </div>
                        }
                    />

                    <h5 className="font-bold text-sm sm:text-base">برش جدید</h5>
                </div>
                <div className="flex flex-col flex-wrap justify-between md:flex-row gap-4 w-full r2l">
                    <input
                        id="xInput"
                        className="base-input flex-grow"
                        placeholder="طول(سانتی متر)"
                        type="number"
                        min={0}
                        value={formData.x == 0 ? '' : formData.x}
                        onChange={(e) => handleInputChange('x', e.target.value)}
                    />
                    <input
                        className="base-input flex-grow"
                        placeholder="عرض(سانتی متر)"
                        type="number"
                        min={0}
                        value={formData.y == 0 ? '' : formData.y}
                        onChange={(e) => handleInputChange('y', e.target.value)}
                    />
                    <input
                        className="base-input flex-grow"
                        placeholder="تعداد"
                        type="number"
                        value={formData.count == 0 ? '' : formData.count}
                        onChange={(e) => handleInputChange('count', e.target.value)}
                    />
                    <input
                        className="base-input flex-grow"
                        placeholder="توضیحات(اختیاری)"
                        type="text"
                        maxLength={15}
                        value={formData?.details}
                        onChange={(e) => handleInputChange('details', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-6 text-xs sm:text-base gap-4 r2l">
                    {/* Checkboxes for PVC */}
                    <div className="bg-sc-purple-normal flex flex-col md:flex-row col-span-3 md:col-span-2 rounded-lg py-4 gap-4">
                        <div className="flex flex-col items-center justify-center w-full gap-2">
                            <p className="text-sc-gray-normal">PVC</p>
                            <div className="flex flex-row justify-between gap-4 sm:gap-8">
                                <div className="flex flex-col justify-center gap-2">
                                    <p className="text-gray-900 text-center underline underline-offset-8 w-full">
                                        طول
                                        {hasX && hasX}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-2">
                                        <input
                                            type="checkbox"
                                            id="pvcTop"
                                            checked={formData.pvctop}
                                            onChange={(e) => handleInputChange('pvctop', e.target.checked)}
                                        />
                                        <label
                                            className="cursor-pointer"
                                            htmlFor="pvcTop">
                                            بالا
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-2">
                                        <input
                                            type="checkbox"
                                            id="pvcbottom"
                                            checked={formData.pvcbottom}
                                            onChange={(e) => handleInputChange('pvcbottom', e.target.checked)}
                                        />
                                        <label
                                            className="cursor-pointer"
                                            htmlFor="pvcbottom">
                                            پایین
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-gray-900 text-center underline underline-offset-8 w-full">
                                        عرض
                                        {hasY && hasY}
                                    </p>
                                    <div className="flex items-center justify-start w-full gap-2">
                                        <input
                                            type="checkbox"
                                            id="pvcRight"
                                            checked={formData.pvcright}
                                            onChange={(e) => handleInputChange('pvcright', e.target.checked)}
                                        />
                                        <label
                                            className="cursor-pointer"
                                            htmlFor="pvcRight">
                                            راست
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-start w-full gap-2">
                                        <input
                                            type="checkbox"
                                            id="pvcLeft"
                                            checked={formData.pvcleft}
                                            onChange={(e) => handleInputChange('pvcleft', e.target.checked)}
                                        />
                                        <label
                                            className="cursor-pointer"
                                            htmlFor="pvcLeft">
                                            چپ
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkboxes for Groove */}
                    <div className="bg-sc-purple-normal flex flex-col md:flex-row col-span-3 md:col-span-1 rounded-lg py-4 gap-4">
                        <div className="flex flex-col items-center justify-center w-full gap-2">
                            <p className="text-sc-gray-normal">(شیار)</p>
                            <div className="flex flex-col items-center justify-center gap-3 h-full">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="xGroove"
                                        checked={formData.xGroove}
                                        onChange={(e) => handleInputChange('xGroove', e.target.checked)}
                                    />
                                    <label
                                        className="cursor-pointer"
                                        htmlFor="xGroove">
                                        شیار طول
                                    </label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="yGroove"
                                        checked={formData.yGroove}
                                        onChange={(e) => handleInputChange('yGroove', e.target.checked)}
                                    />
                                    <label
                                        className="cursor-pointer"
                                        htmlFor="yGroove">
                                        شیار عرض
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkboxes for Gazor */}
                    <div className="bg-sc-purple-normal flex flex-col md:flex-row col-span-3 md:col-span-1 rounded-lg py-4 gap-4">
                        <div className="flex flex-col items-center justify-center w-full gap-2">
                            <p className="text-sc-gray-normal">(جای لولا)</p>
                            <div className="flex flex-col items-center justify-center gap-3 h-full">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="xGazor"
                                        checked={formData.xGazor}
                                        onChange={(e) => handleInputChange('xGazor', e.target.checked)}
                                    />
                                    <label
                                        className="cursor-pointer"
                                        htmlFor="xGazor">
                                        گازور طول
                                    </label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="yGazor"
                                        checked={formData.yGazor}
                                        onChange={(e) => handleInputChange('yGazor', e.target.checked)}
                                    />
                                    <label
                                        className="cursor-pointer"
                                        htmlFor="yGazor">
                                        گازور عرض
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-sc-purple-normal flex flex-col md:flex-row justify-center col-span-3 md:col-span-2 rounded-lg py-4 gap-4">
                        <CutPlane dimension={formData} />
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
