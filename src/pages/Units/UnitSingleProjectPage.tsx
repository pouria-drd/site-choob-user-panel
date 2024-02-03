import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';

import BinIcon from '../../components/icons/BinIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import Modal from '../../components/uiComp/modals/Modal';
import Spinner from '../../components/uiComp/spinner/Spinner';
import SingleProjectHeader from './Headers/SingleProjectHeader';
import UnitProjectService from '../../services/UnitProjectService';
import UnitPropsContent from '../../contents/UnitProject/UnitPropsContent';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';

interface UnitSingleProjectPageParams {
    projectID: string;
}

function UnitSingleProjectPage() {
    const unitProjectService = new UnitProjectService();

    const { showConfirmModal } = useConfirmModal();
    const { showToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [selectedUnit, setSelectedUnit] = useState<UnitProjectDimensionsModel>();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as UnitSingleProjectPageParams;

    const [projectDTO, setProjectDTO] = useState<UnitProjectDTO>();
    const [isLoading, setIsLoading] = useState(false);

    const [isCalculating, setIsCalculating] = useState(false);

    const [tableData, setTableData] = useState<{
        headers: string[];
        rows: Array<(string | JSX.Element)[]>;
    }>({ headers: [], rows: [] });

    const fetchData = async () => {
        if (!projectID) return; //TODO: redirect?
        try {
            var result = await unitProjectService.GetSingleProject<UnitProjectDTO>(projectID);

            console.log(result);
            if (result) {
                setProjectDTO(result);

                generateTableData(result.dimensions);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const generateTableData = (data: UnitProjectDimensionsModel[]) => {
        const updatedTableData = {
            headers: ['عنوان یونیت', 'توضیحات', 'جزئیات', 'تعداد', 'عملیات'],
            rows: data.map((item) => [
                parseProjectUnitProps(item.properties).title,
                parseProjectUnitProps(item.properties).description,
                parseProjectUnitProps(item.properties).details,
                item.count.toString(),
                <div className="flex r2l justify-end lg:justify-center gap-4 md:gap-6">
                    <button
                        onClick={() => handleShowUnit(item)}
                        className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                        <EyeIcon className="w-4 h-4 md:h-5 md:w-5" />
                    </button>
                    <button
                        className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal"
                        onClick={() => {
                            handleDeleteButton(parseProjectUnitProps(item.properties).title, item.id);
                        }}>
                        <BinIcon className="w-4 h-4 md:h-5 md:w-5" />
                    </button>
                </div>,
            ]),
        };
        setTableData(updatedTableData);
    };

    const handleDeleteButton = (title: string, unitId: string) => {
        // Handle button click for a specific item
        handleShowConfirm(title, unitId);
    };

    const handleShowConfirm = (title: string, unitId: string) => {
        const msg = 'آیا از حذف یونیت' + `(${title})` + 'از پروژه اطمینان دارید؟';
        showConfirmModal(msg, () => handleConfirm(unitId), undefined, {
            isDanger: true,
            ConfirmText: 'حذف',
        });
    };

    const handleConfirm = async (unitId: string) => {
        setIsLoading(true);
        try {
            const result = await unitProjectService.DeleteUnitFromProject<any>(projectID, unitId);

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

    useEffect(() => {}, [tableData]);

    const parseProjectUnitProps = (prop: UnitProjectDimensionsPropsModel[]) => {
        let parseProp: UnitProjectDimensionPropParsed = { title: '', description: '--', details: '' };

        prop.map((p) => {
            if (p.name === 'name') parseProp.title = p.value;

            if (p.name === 'description') parseProp.description = p.value;

            if (p.name === 'details') parseProp.details = p.value;
        });

        return parseProp;
    };

    const CalculateProject = async (dto: CalculateUnitProjectDTO) => {
        setIsCalculating(true);
        try {
            var result = await unitProjectService.CalculateProject<any>(dto);

            if (result.status) {
                showToast(result.message, ToastStatusEnum.Success);
            } else {
                showToast(result.message, ToastStatusEnum.Error);
            }
        } catch (e) {}
        setIsCalculating(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowUnit = (unit: UnitProjectDimensionsModel) => {
        setSelectedUnit(unit);

        openModal();
    };

    return (
        <>
            {isLoading && <Spinner flex={true} />}
            {!isCalculating ? (
                <>
                    {projectDTO?.project && !isLoading && (
                        <div className="flex flex-col gap-4 w-full font-peyda pb-16">
                            <SingleProjectHeader
                                project={projectDTO.project}
                                onCalculateClicked={CalculateProject}
                            />
                            <div className="flex flex-col flex-grow overflow-y-auto">
                                <ResponsiveTable
                                    data={tableData}
                                    addIndex={true}
                                />
                            </div>
                        </div>
                    )}

                    {selectedUnit && !isLoading && (
                        <Modal
                            title={parseProjectUnitProps(selectedUnit.properties).title}
                            isOpen={isModalOpen}
                            onClose={closeModal}>
                            <UnitPropsContent
                                projectId={projectID}
                                unitId={selectedUnit.id}
                            />
                        </Modal>
                    )}
                </>
            ) : (
                <p>Isacalulating</p>
            )}
        </>
    );
}

export default UnitSingleProjectPage;
