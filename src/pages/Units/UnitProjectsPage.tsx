import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusEnum } from '../../enums/StatusEnum';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';

import BinIcon from '../../components/icons/BinIcon';
import EditIcon from '../../components/icons/EditIcon';
import NewProjectHeader from './Headers/NewProjectHeader';
import Spinner from '../../components/uiComp/spinner/Spinner';
import StatusChip from '../../components/uiComp/chips/StatusChip';
import UnitProjectService from '../../services/UnitProjectService';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';

function UnitProjectsPage() {
    const { showConfirmModal } = useConfirmModal();

    const navigate = useNavigate();
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();
    const [isLoading, setIsLoading] = useState(true);

    const [tableData, setTableData] = useState<{
        headers: string[];
        rows: Array<(string | JSX.Element)[]>;
    }>({ headers: [], rows: [] });

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await unitProjectService.GetProjectsList<UnitProjectModel[]>();

            console.log('result', result);
            if (!result) {
                setIsLoading(false);
                return;
            }

            const updatedTableData = {
                headers: ['عنوان', 'توضیحات', 'وضعیت', 'عملیات'],
                rows: result.map((item) => [
                    item.title,
                    item.description ? item.description : '---',
                    <div className="flex justify-end lg:justify-center">
                        {item.isCalculated && (
                            <StatusChip
                                text="محاسبه شده"
                                type={StatusEnum.Success}
                            />
                        )}
                        {!item.isCalculated && (
                            <StatusChip
                                text="درحال ویرایش"
                                type={StatusEnum.Info}
                            />
                        )}
                    </div>,
                    <div className="flex r2l justify-end lg:justify-center gap-4 md:gap-6">
                        <button
                            onClick={() => handleNavigate(item.id)}
                            className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                            <EditIcon className="w-4 h-4 md:h-5 md:w-5" />
                        </button>
                        <button
                            className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal"
                            onClick={() => handleDeleteButton(item.title, item.id)}>
                            <BinIcon className="w-4 h-4 md:h-5 md:w-5" />
                        </button>
                    </div>,
                ]),
            };
            setTableData(updatedTableData);
        } catch (e) {}

        setIsLoading(false);
    };

    const handleDeleteButton = (title: string, projectId: string) => {
        // Handle button click for a specific item
        handleShowConfirm(title, projectId);
    };

    const handleShowConfirm = (title: string, projectId: string) => {
        const msg = 'آیا از حذف پروژه ' + title + ' مطمئن هستید؟';
        showConfirmModal(msg, () => handleConfirm(projectId), undefined, {
            isDanger: true,
            ConfirmText: 'حذف',
        });
    };

    const handleConfirm = async (projectId: string) => {
        setIsLoading(true);
        try {
            const result = await unitProjectService.DeleteProject<any>(projectId);

            if (result.status === true) {
                showToast(result.message, ToastStatusEnum.Warning);
                setTableData({ headers: [], rows: [] });
                await fetchData();
            }
            if (result.status === false) {
                showToast(result.message, ToastStatusEnum.Error);
            }
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error);
        }
        setIsLoading(false);
    };

    const handleNavigate = (projectId: string) => {
        navigate('/unit-project/' + projectId);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {}, [tableData, isLoading]);

    return (
        <>
            {isLoading ? (
                <Spinner flex={true} />
            ) : (
                <div className="flex flex-col gap-4 w-full font-peyda pb-16">
                    <NewProjectHeader />
                    <div className="flex flex-col flex-grow overflow-y-auto">
                        {/* ResponsiveTable should handle its own height */}
                        <ResponsiveTable
                            data={tableData}
                            addIndex={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default UnitProjectsPage;
