import { useEffect, useState } from 'react';
import NewProjectHeader from './Headers/NewProjectHeader';
import UnitProjectService from '../../services/UnitProjectService';
import Spinner from '../../components/uiComp/spinner/Spinner';
import StatusChip from '../../components/uiComp/chips/StatusChip';
import { StatusEnum } from '../../enums/StatusEnum';
import EditIcon from '../../components/icons/EditIcon';
import BinIcon from '../../components/icons/BinIcon';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
import { useToast } from '../../components/uiComp/toasts/ToastProvider';
import { useNavigate } from 'react-router-dom';

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

            if (!result) return;

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
                    <div className="flex r2l justify-end lg:justify-center gap-6">
                        <button
                            onClick={() => handleNavigate(item.id)}
                            className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                            <EditIcon />
                        </button>
                        <button
                            className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal"
                            onClick={() => handleDeleteButton(item.title, item.id)}>
                            <BinIcon />
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
                fetchData();
                showToast(result.message, StatusEnum.Warning);
            }
            if (result.status === false) {
                showToast(result.message, StatusEnum.Error);
            }
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, StatusEnum.Error);
        }
        setIsLoading(false);
    };

    const handleNavigate = (projectId: string) => {
        navigate('/unit-project/' + projectId);
    };
    useEffect(() => {
        fetchData();
    }, []);

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
