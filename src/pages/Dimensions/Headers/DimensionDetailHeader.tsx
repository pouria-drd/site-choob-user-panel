import { useEffect, useState } from 'react';
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

    const [pvcColor, setPvcColor] = useState('');
    const [description, setDescription] = useState('');

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

    useEffect(() => {
        setPvcColor(headerData.pvcColor);
        setDescription(headerData.description);
    }, []);

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
            <div className="grid grid-cols-6 bg-white rounded-lg w-full px-4 py-6 sm:p-6 gap-y-4">
                <div className="col-span-6 sm:col-span-2 border-b sm:border-none pb-4 sm:p-0">
                    <div className="flex justify-between items-center">
                        {!headerData.sentForCut ? (
                            !headerData.isConfirmed ? (
                                <button
                                    onClick={handleCalculateClick}
                                    className="base-button outlined-info gap-1 sm:hidden"
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6">
                        <p className="text-sm sm:text-base inline-block">
                            عنوان:
                            <span className="text-gray-400">{headerData?.title}</span>
                        </p>
                        {/* LIKE ABOVE>>> */}
                        {/* TODO: component these:>>> */}

                        <p className="text-sm sm:text-base inline-block">
                            رنگ PVC:
                            <span className="text-gray-400">{pvcColor}</span>
                        </p>

                        <p className="text-sm sm:text-base inline-block">
                            ابعاد ورق:
                            <span className="text-gray-400">{headerData.woodSheetDimensions}</span>
                        </p>

                        <p className="text-sm sm:text-base inline-block">
                            نوع برش:
                            <span className="text-gray-400">{headerData.isNotRotatable ? 'از راه چوب' : 'آزاد'}</span>
                        </p>

                        <p className="text-sm sm:text-base inline-block">
                            توضیحات:
                            <span className="text-gray-400">{description}</span>
                        </p>
                    </div>
                </div>

                <div className="col-span-6 hidden sm:block">
                    {!headerData.sentForCut ? (
                        !headerData.isConfirmed ? (
                            <button
                                onClick={handleCalculateClick}
                                className="base-button outlined-info gap-1"
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
