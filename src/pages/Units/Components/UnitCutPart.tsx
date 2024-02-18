import { useState } from 'react';
import { useConfirmModal } from '../../../components/uiComp/modals/ConfirmModalProvider';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

import BinIcon from '../../../components/icons/BinIcon';
import CutPlane from '../../../contents/dimensions/CutPlane';
import EditIcon from '../../../components/icons/EditIcon';
import CutPartEdit from '../../../contents/UnitProject/CutPartEdit';
import Modal from '../../../components/uiComp/modals/Modal';

interface DimensionCutListProps {
    dimensionCutData: DimensionCutModel[];

    isEditable?: boolean;
    onEdit?: (editedData: DimensionCutModel[]) => void;
}

const UnitCutPart = ({ dimensionCutData, isEditable = false, onEdit }: DimensionCutListProps) => {
    const { showToast } = useToast();
    const { showConfirmModal } = useConfirmModal();
    const [isProcessing, setIsProcessing] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const [selectedCutPartForEdit, setSelectedCutPartForEdit] = useState<DimensionCutModel>();

    const handleDeleteButton = (item: DimensionCutModel) => {
        // Handle button click for a specific item
        if (!isEditable) return;
        if (item.guid) handleShowConfirm(item.guid);
    };

    const handleShowEditModal = (cutpart: DimensionCutModel) => {
        setSelectedCutPartForEdit(cutpart);
        openEditModal();
    };
    const handleShowConfirm = (cutGuid: string) => {
        const msg = 'آیا از حذف ریز ابعاد از لیست مطمئن هستید؟';
        showConfirmModal(msg, () => handleConfirm(cutGuid), undefined, {
            isDanger: true,
            ConfirmText: 'حذف',
        });
    };

    const handleConfirm = async (cutGuid: string) => {
        if (!onEdit) return;
        setIsProcessing(true);
        try {
            onEdit(dimensionCutData.filter((x) => x.guid != cutGuid));
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error);
        }
        setIsProcessing(false);
    };

    const handleOnEdit = (editedCutPart: DimensionCutModel) => {
        if (!onEdit) return;

        let editedItemIndex = dimensionCutData.indexOf(dimensionCutData.filter((x) => x.guid === editedCutPart.guid)[0]);

        let editedData = dimensionCutData;
        editedData[editedItemIndex] = editedCutPart;

        onEdit(editedData);
        closeEditModal();
    };

    /* useEffect(() => {
        let dataList: DimensionCutModel[] = [];

        if (dimensionCutData.length === 0) {
            return;
        }

        dimensionCutData.map((d) => {
            let dimension = d;
            if (dimension.details) {
                if (dimension.details.includes('#')) {
                    dimension.details = dimension.details?.split('#')[1] + '-' + dimension.details?.split('#')[2];
                }
            }

            dataList.push(dimension);
        });

        setData(dataList);
    }, [dimensionCutData]);*/

    const splitDetails = (details: string) => {
        if (details.includes('#')) {
            return details?.split('#')[1] + '-' + details?.split('#')[2];
        }
    };

    return (
        <>
            {dimensionCutData && dimensionCutData.length > 0 && (
                <>
                    <div className="bg-white rounded-lg px-2 py-2 sm:p-2 w-full">
                        <div className="flex flex-col justify-end items-end gap-2 font-yekanX ss02">
                            {dimensionCutData.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row-reverse transition-all gap-2 items-end md:items-center justify-between p-4 md:px-4 md:py-3 rounded border border-gray-300 hover:bg-gray-200 odd:bg-gray-50 even:bg-gray-100 text-xs sm:text-base w-full">
                                    {isEditable ? (
                                        <div className="flex justify-between md:justify-end gap-2 items-center r2l w-full md:w-auto mb-2 md:mb-0 border-b border-gray-300 md:border-0 pb-2 md:pb-0">
                                            <h4 className="font-semibold">{index + 1}#</h4>
                                            <div className="flex md:hidden items-center gap-4">
                                                <button
                                                    onClick={() => handleShowEditModal(data)}
                                                    className="text-sc-blue-normal hover:text-sc-purple-400 flex items-center"
                                                    disabled={isProcessing}>
                                                    <EditIcon className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteButton(data)}
                                                    className="text-red-600 hover:text-red-800 flex items-center"
                                                    disabled={isProcessing}>
                                                    <BinIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <h4 className="font-semibold">{index + 1}#</h4>
                                    )}
                                    <div className="flex items-center w-full">
                                        <div className="flex gap-1 items-center r2l w-full text-xs sm:text-sm">[{data.details ? <p className="font-semibold sm:whitespace-nowrap">{splitDetails(data.details)}</p> : <p>---</p>}]</div>
                                    </div>
                                    <div className="flex flex-row divide-x first:divide-none items-center justify-between sm:justify-start w-full text-xs sm:text-sm">
                                        <div className="flex gap-1 items-center r2l w-full px-2">
                                            <span>طول:</span>
                                            <span className="font-semibold"> {data.x}</span>
                                        </div>
                                        <div className="flex gap-1 items-center r2l w-full px-2">
                                            <span>عرض:</span>
                                            <span className="font-semibold">{data.y}</span>
                                        </div>
                                        <div className="flex gap-1 items-center r2l w-full px-2">
                                            <span>تعداد:</span>
                                            <span className="font-semibold">{data.count}</span> عدد
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center w-full mt-2">
                                        <CutPlane dimension={data} />
                                    </div>

                                    {isEditable && (
                                        <div className="hidden md:flex items-center gap-2">
                                            <button
                                                onClick={() => handleDeleteButton(data)}
                                                className="text-red-600 hover:text-red-800 flex items-center"
                                                disabled={isProcessing}>
                                                <BinIcon className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => handleShowEditModal(data)}
                                                className="text-sc-blue-normal hover:text-sc-purple-400 flex items-center"
                                                disabled={isProcessing}>
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {selectedCutPartForEdit && selectedCutPartForEdit.details && (
                        <Modal
                            title={selectedCutPartForEdit.details}
                            isOpen={isEditModalOpen}
                            onClose={closeEditModal}>
                            <CutPartEdit
                                cutPart={selectedCutPartForEdit}
                                onEdit={handleOnEdit}
                            />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};
export default UnitCutPart;
