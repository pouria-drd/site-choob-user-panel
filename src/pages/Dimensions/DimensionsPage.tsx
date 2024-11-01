import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';

import DimensionStatus from './Components/DimensionStatus';
import Modal from '../../components/uiComp/modals/Modal';
import BinIcon from '../../components/icons/BinIcon';
import EditIcon from '../../components/icons/EditIcon';
import Button from '../../components/uiComp/buttons/Button';
import Spinner from '../../components/uiComp/spinner/Spinner';
import DimensionService from '../../services/DimensionService';
import NewCutContent from '../../contents/dimensions/NewCutContent';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';

interface DimensionListResult {
    id: string;
    title: string;
    status: string;
    description: string;
    woodSheetDimensions: string;
    isInUse: boolean;
    isConfirmed: boolean;
    isNotRotatable: boolean;
    isProccessing: boolean;
}

function DimensionsPage() {
    const { showToast } = useToast();
    const { showConfirmModal } = useConfirmModal();

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const dimensionService = new DimensionService();
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState<{
        headers: string[];
        rows: Array<(string | JSX.Element)[]>;
    }>({ headers: [], rows: [] });

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await dimensionService.GetDimensionList<DimensionListResult[]>();

            if (!result) {
                setIsLoading(false);
                return;
            }

            const updatedTableData = {
                headers: ['عنوان', 'ابعاد ورق', 'توضیحات', 'وضعیت', 'عملیات'],
                rows: result.map((item) => [
                    item.title,
                    item.woodSheetDimensions,
                    item.description,
                    <div className="flex justify-end lg:justify-center">
                        <DimensionStatus dimension={item} />
                    </div>,
                    <div className="flex r2l justify-end lg:justify-center gap-4 md:gap-6">
                        <button
                            onClick={() => handleEditButton(item.id)}
                            className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal p-1">
                            <EditIcon className="w-4 h-4 md:h-5 md:w-5" />
                        </button>
                        <button
                            className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal p-1"
                            onClick={() => handleDeleteButton(item)}>
                            <BinIcon className="w-4 h-4 md:h-5 md:w-5" />
                        </button>
                    </div>,
                ]),
            };

            setTableData(updatedTableData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditButton = (dimensionID: string) => {
        navigate('/dimension/' + dimensionID);
    };

    const handleDeleteButton = (item: DimensionListResult) => {
        // Handle button click for a specific item
        handleShowConfirm(item.title, item.id);
    };

    const handleConfirm = async (dimensionID: string) => {
        setIsLoading(true);
        try {
            const result = await dimensionService.DeleteDimensionList<any>(dimensionID);

            if (result.status === true) {
                showToast(result.message, ToastStatusEnum.Success);
                setTableData({ headers: [], rows: [] });
                await fetchData();
            }
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error);
        }
        setIsLoading(false);
    };

    const handleShowConfirm = (title: string, dimensionID: string) => {
        const msg = 'آیا از حذف ' + title + ' مطمئن هستید؟';
        showConfirmModal(msg, () => handleConfirm(dimensionID), undefined, {
            isDanger: true,
            ConfirmText: 'حذف',
        });
    };

    return (
        <>
            {isLoading ? (
                <Spinner
                    flex={true}
                    size={30}
                />
            ) : (
                <>
                    <div className="flex flex-col gap-6 overflow-hidden w-full h-full pb-16">
                        <div className="flex flex-shrink-0 justify-between items-center font-peyda w-full">
                            <Button
                                text="ابعاد جدید"
                                onClick={openModal}
                            />
                            <h2 className="text-lg md:text-xl text-right font-semibold">لیست ابعاد</h2>
                        </div>

                        <div className="flex flex-col flex-grow overflow-y-auto">
                            {/* ResponsiveTable should handle its own height */}
                            <ResponsiveTable
                                data={tableData}
                                addIndex={true}
                            />
                        </div>
                    </div>
                </>
            )}

            <Modal
                title="تعریف ابعاد جدید"
                isOpen={isModalOpen}
                onClose={closeModal}>
                <NewCutContent />
            </Modal>
        </>
    );
}

export default DimensionsPage;
