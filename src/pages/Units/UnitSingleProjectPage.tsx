import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnitProjectService from '../../services/UnitProjectService';
import SingleProjectHeader from './Headers/SingleProjectHeader';
import EditIcon from '../../components/icons/EditIcon';
import BinIcon from '../../components/icons/BinIcon';
import ResponsiveTable from '../../components/uiComp/tables/ResponsiveTable';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
import { useToast } from '../../components/uiComp/toasts/ToastProvider';
import { StatusEnum } from '../../enums/StatusEnum';
import EyeIcon from '../../components/icons/EyeIcon';

interface UnitSingleProjectPageParams {
    projectID: string;
}
function UnitSingleProjectPage() {
    const unitProjectService = new UnitProjectService();

    const { showConfirmModal } = useConfirmModal();
    const { showToast } = useToast();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as UnitSingleProjectPageParams;

    const [projectDTO, setProjectDTO] = useState<UnitProjectDTO>();
    const [isLoading, setIsLoading] = useState(false);

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
                <div className="flex r2l justify-end lg:justify-center gap-6">
                    <button
                        onClick={() => {}}
                        className="text-sc-blue-normal rounded-lg hover:bg-sc-purple-normal">
                        <EyeIcon />
                    </button>
                    <button
                        className="text-sc-red-normal rounded-lg hover:bg-sc-purple-normal"
                        onClick={() => {
                            handleDeleteButton(parseProjectUnitProps(item.properties).title, item.id);
                        }}>
                        <BinIcon />
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
                showToast(result.message, StatusEnum.Warning);
                setTableData({ headers: [], rows: [] });
                await fetchData();
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {projectDTO?.project && (
                <div className="flex flex-col gap-4 w-full font-peyda pb-16">
                    <SingleProjectHeader project={projectDTO.project} />
                    <div className="flex flex-col flex-grow overflow-y-auto">
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

export default UnitSingleProjectPage;
