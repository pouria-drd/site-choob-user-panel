import { useState } from 'react';
import { useConfirmModal } from '../../../components/uiComp/modals/ConfirmModalProvider';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

import BinIcon from '../../../components/icons/BinIcon';
import CutPlane from '../../../contents/dimensions/CutPlane';
import DimensionService from '../../../services/DimensionService';

interface DimensionCutListProps {
    dimensionCutData: DimensionCutModel[];

    dimensionId?: string;
    isDeletable?: boolean;
    onDelete?: () => void;
}

const DimensionCutList = ({ dimensionCutData, isDeletable = false, dimensionId, onDelete }: DimensionCutListProps) => {
    const dimensionService = new DimensionService();
    const { showToast } = useToast();
    const { showConfirmModal } = useConfirmModal();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDeleteButton = (item: DimensionCutModel) => {
        // Handle button click for a specific item

        if (item.guid) handleShowConfirm(item.guid);
    };

    const handleShowConfirm = (cutGuid: string) => {
        const msg = 'آیا از حذف ریز ابعاد از لیست مطمئن هستید؟';
        showConfirmModal(msg, () => handleConfirm(cutGuid), undefined, {
            isDanger: true,
            ConfirmText: 'حذف',
        });
    };

    const handleConfirm = async (cutGuid: string) => {
        if (!dimensionId || !onDelete) return;
        setIsProcessing(true);
        try {
            const result = await dimensionService.DeleteFromDimensionCutList<any>(dimensionId, cutGuid);

            if (result.status === true) {
                showToast('ریز ابعاد حذف شد', ToastStatusEnum.Warning);
                onDelete();
            }
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error);
        }
        setIsProcessing(false);
    };

    return (
        <>
            {dimensionCutData && dimensionCutData.length > 0 && (
                <div className="bg-white rounded-lg px-2 py-4 sm:p-2 w-full">
                    <div className="flex flex-col justify-end items-end gap-2 font-yekanX ss02">
                        {dimensionCutData.map((data, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row-reverse transition-all gap-4 items-end md:items-center justify-between p-4 rounded border border-gray-300 hover:bg-gray-200 odd:bg-gray-50 even:bg-gray-100 text-xs sm:text-base w-full">
                                {isDeletable ? (
                                    <div className="flex justify-between md:justify-end gap-2 items-center r2l w-full md:w-auto mb-2 md:mb-0 border-b border-gray-300 md:border-0 pb-2 md:pb-0">
                                        <h4 className="font-semibold">{index + 1}#</h4>
                                        <button
                                            onClick={() => handleDeleteButton(data)}
                                            className="text-red-600 hover:text-red-800 md:hidden"
                                            disabled={isProcessing}>
                                            <BinIcon />
                                        </button>
                                    </div>
                                ) : (
                                    <h4 className="font-semibold">{index + 1}#</h4>
                                )}
                                <div className="flex flex-row-reverse gap-2 items-center justify-between sm:justify-start w-full text-xs sm:text-sm">
                                    <div className="flex gap-1 items-center r2l w-full">
                                        <span>طول:</span>
                                        <span className="font-semibold"> {data.x}</span>
                                    </div>
                                    <div className="flex gap-1 items-center r2l w-full">
                                        <span>عرض:</span>
                                        <span className="font-semibold">{data.y}</span>
                                    </div>
                                    <div className="flex gap-1 items-center r2l w-full">
                                        <span>تعداد:</span>
                                        <span className="font-semibold">{data.count}</span> عدد
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center r2l w-full text-xs sm:text-sm">
                                    <span>توضیحات:</span>
                                    {data.details ? <p className="font-semibold sm:whitespace-nowrap">{data.details}</p> : <p>---</p>}
                                </div>

                                <div className="flex items-center justify-center w-full">
                                    <CutPlane dimension={data} />
                                </div>

                                {isDeletable && (
                                    <button
                                        onClick={() => handleDeleteButton(data)}
                                        className="text-red-600 hover:text-red-800 hidden md:block"
                                        disabled={isProcessing}>
                                        <BinIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default DimensionCutList;
