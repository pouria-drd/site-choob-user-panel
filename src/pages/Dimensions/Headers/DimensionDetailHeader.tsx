import { useState } from 'react';
import { StatusEnum } from '../../../enums/StatusEnum';
import DimensionStatus from '../Components/DimensionStatus';
import EditCutContent from '../../../contents/dimensions/EditCutContent';

import MapIcon from '../../../components/icons/MapIcon';
import EditIcon from '../../../components/icons/EditIcon';
import CopyIcon from '../../../components/icons/CopyIcon';
import PaperClipIcon from '../../../components/icons/PaperClipIcon';
import CalculatorIcon from '../../../components/icons/CalculatorIcon';

import Modal from '../../../components/uiComp/modals/Modal';
import StatusChip from '../../../components/uiComp/chips/StatusChip';

interface DimensionHeaderProps {
    headerData: DimensionDetailModel;
    canSendProcessRequest?: boolean;
    onUpdate: () => void;
    onCopyClicked?: () => void;
    onCutMapClicked?: () => void;
    onCalculateClicked?: () => void;
}

const DimensionDetailHeader = ({ headerData, onUpdate, canSendProcessRequest = false, onCopyClicked, onCalculateClicked, onCutMapClicked }: DimensionHeaderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeOnUpdate = () => {
        setIsModalOpen(false);
        onUpdate();
    };

    const handleCalculateClick = () => {
        if (onCalculateClicked) onCalculateClicked();
    };

    const handleOnCutMapClicked = () => {
        if (onCutMapClicked) onCutMapClicked();
    };

    const handleCopyClicked = () => {
        if (onCopyClicked) onCopyClicked();
    };

    return (
        <>
            {headerData.isConfirmed && (
                <div className="flex justify-between">
                    <StatusChip
                        type={StatusEnum.Warning}
                        text={
                            <div className="flex gap-1 items-center">
                                <p>{headerData.id}</p>

                                <PaperClipIcon size={15} />
                            </div>
                        }
                    />
                    <StatusChip
                        type={StatusEnum.Success}
                        text={
                            <div className="flex flex-col sm:flex-row gap-1 items-start r2l">
                                <p>ورق مورد نیاز:</p>
                                <div className="flex items-center justify-center gap-1">
                                    <p className="font-bold">{headerData.woodSheetCount}</p>
                                    <p>عدد</p>
                                </div>
                            </div>
                        }
                    />
                </div>
            )}
            {!headerData.isConfirmed && (
                <StatusChip
                    type={StatusEnum.Warning}
                    text={
                        <div className="flex gap-1 items-center">
                            <p>{headerData.id}</p>

                            <PaperClipIcon size={15} />
                        </div>
                    }
                />
            )}
            <div className="grid grid-cols-6 bg-white rounded-lg w-full px-4 py-6 sm:p-6 gap-y-8">
                <div className="col-span-6 sm:col-span-2 border-b sm:border-none pb-4 sm:p-0">
                    <div className="flex justify-between items-center">
                        {!headerData.sentForCut ? (
                            !headerData.isConfirmed ? (
                                <button
                                    onClick={handleCalculateClick}
                                    className="base-button info gap-1 sm:hidden"
                                    disabled={!canSendProcessRequest}>
                                    محاسبه
                                    <CalculatorIcon size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleOnCutMapClicked}
                                    className="base-button success-reverse gap-1 sm:hidden ">
                                    نقشه برش
                                    <MapIcon size={18} />
                                </button>
                            )
                        ) : (
                            <button
                                onClick={handleOnCutMapClicked}
                                className="base-button success-reverse gap-1 sm:hidden ">
                                نقشه برش
                                <MapIcon size={18} />
                            </button>
                        )}
                        <div className="flex gap-4 items-center ">
                            {!headerData.sentForCut ? (
                                <button
                                    onClick={openModal}
                                    className="hover:text-blue-700 text-sc-blue-normal">
                                    <EditIcon />
                                </button>
                            ) : (
                                <button
                                    onClick={handleCopyClicked}
                                    className="hover:text-green-900 text-sc-green-normal">
                                    <CopyIcon />
                                </button>
                            )}
                            <DimensionStatus dimension={headerData} />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 sm:col-span-4 r2l">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10">
                        <p className="text-sm sm:text-base inline-block">
                            عنوان:
                            <span className="text-gray-400">{headerData?.title}</span>
                        </p>
                        {/* LIKE ABOVE>>> */}
                        {/* TODO: component these:>>> */}

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>رنگ PVC:</p>
                            <p className="text-gray-400">{headerData?.pvcColor}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>ابعاد ورق:</p>
                            <p className="text-gray-400">{headerData?.woodSheetDimensions}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>نوع برش:</p>
                            <p className="text-gray-400">{headerData?.isNotRotatable ? 'از راه چوب' : 'آزاد'}</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>قطر تیغه برش:</p>
                            <p className="text-gray-400">4.5mm</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>تریم از هر طرف:</p>
                            <p className="text-gray-400">5mm</p>
                        </div>

                        <div className="flex  items-center gap-1 text-sm sm:text-base">
                            <p>توضیحات:</p>
                            <p className="text-gray-400">{headerData?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 hidden sm:block">
                    {!headerData.sentForCut ? (
                        !headerData.isConfirmed ? (
                            <button
                                onClick={handleCalculateClick}
                                className="base-button info gap-1"
                                disabled={!canSendProcessRequest}>
                                محاسبه
                                <CalculatorIcon size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleOnCutMapClicked}
                                className="base-button success-reverse gap-1">
                                نقشه برش
                                <CalculatorIcon size={18} />
                            </button>
                        )
                    ) : (
                        <button
                            onClick={handleOnCutMapClicked}
                            className="base-button success-reverse gap-1">
                            نقشه برش
                            <MapIcon size={18} />
                        </button>
                    )}
                </div>
            </div>

            {headerData && (
                <Modal
                    title="تعریف ابعاد جدید"
                    isOpen={isModalOpen}
                    onClose={closeModal}>
                    <EditCutContent
                        onUpdate={closeOnUpdate}
                        dimension={headerData}
                    />
                </Modal>
            )}
        </>
    );
};

export default DimensionDetailHeader;
