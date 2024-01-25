import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../components/uiComp/modals/Modal';
import Spinner from '../../components/uiComp/spinner/Spinner';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';

import DimensionStatus from './Components/DimensionStatus';
import EyeIcon from '../../components/icons/EyeIcon';
import CopyIcon from '../../components/icons/CopyIcon';
import DimensionService from '../../services/DimensionService';
import CopyCutDimension from '../../contents/dimensions/CopyCutDimension';

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

function DimensionsHistoryPage() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false)
    };

    const onSuccessCopy = (copyDimensionId: string) => {
        setIsModalOpen(false)
        navigate("/dimension/" + copyDimensionId);
    };

    const dimensionService = new DimensionService();
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState<{
        headers: string[];
        rows: Array<(string | JSX.Element)[]>;
    }>({ headers: [], rows: [] });


    const [selectedDimensionID, setSelectedDimensionID] = useState("");
    const [selectedDimensionTitle, setSelectedDimensionTitle] = useState("");

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await dimensionService.GetDimensionHistoryList<DimensionListResult[]>();

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
                    <div className="flex r2l justify-end lg:justify-center gap-6">
                        <button
                            onClick={() => handleEditButton(item.id)}
                            className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                            <EyeIcon />
                        </button>
                        <button
                            onClick={() => handleShowCopyModal(item.id, item.title)}
                            className="text-sc-green-normal rounded-lg hover:bg-sc-purple-normal">
                            <CopyIcon />
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

    const handleShowCopyModal = (dimensionID: string, dimensionTitle: string) => {
        setSelectedDimensionID(dimensionID)
        setSelectedDimensionTitle("کپی از: " + dimensionTitle);
        openModal();
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditButton = (dimensionID: string) => {
        navigate('/dimension/' + dimensionID);
    };

    return (
        <>
            {isLoading ? (
                <Spinner
                    flex={true}
                    size={30}
                />
            ) : (
                <div className="flex flex-col gap-6 overflow-hidden w-full h-full pb-16">


                    <div className="flex flex-shrink-0 justify-end items-center font-peyda w-full">

                        <h2 className="text-xl md:text-2xl font-bold text-right py-1">تاریخچه ابعاد</h2>
                    </div>


                    <div className="flex flex-col flex-grow overflow-y-auto">
                        {/* ResponsiveTable should handle its own height */}
                        <ResponsiveTable
                            data={tableData}
                            addIndex={true}
                        />
                    </div>
                </div>
            )}

            <Modal
                title={selectedDimensionTitle}
                isOpen={isModalOpen}
                onClose={closeModal}>
                <CopyCutDimension dimensionID={selectedDimensionID} onSuccess={onSuccessCopy} />
            </Modal>
        </>
    );
}

export default DimensionsHistoryPage;
