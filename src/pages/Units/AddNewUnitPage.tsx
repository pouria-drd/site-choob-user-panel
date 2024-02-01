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
import { useNavigate, useParams } from 'react-router-dom';
import UnitSelectionHeader from './Headers/UnitSelectionHeader';
import SimpleGroundUnit from './Components/Units/SimpleGroundUnit';

interface AddNewUnitPageParams {
    projectID: string;
}

function AddNewUnitPage() {
    const { showConfirmModal } = useConfirmModal();

    const navigate = useNavigate();
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();
    const [isLoading, setIsLoading] = useState(true);

    const [units, setUnits] = useState<UnitPropsDTO[]>([]);

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as AddNewUnitPageParams;

    const [projectDTO, setProjectDTO] = useState<UnitProjectDTO>();

    const fetchData = async () => {
        if (!projectID) return; //TODO: redirect?
        setIsLoading(true);
        try {
            var projectResult = await unitProjectService.GetSingleProject<UnitProjectDTO>(projectID, false);
            if (projectResult) setProjectDTO(projectResult);
            var result = await unitProjectService.GetUnits<UnitPropsDTO[]>();

            if (result) setUnits(result);
        } catch (e) {}

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner flex={true} />
            ) : (
                <div className="flex flex-col gap-10 w-full font-peyda pb-16">
                    <UnitSelectionHeader
                        onSelectionChanged={(u) => {
                            console.log(u);
                        }}
                        units={units}
                    />
                    <SimpleGroundUnit />
                </div>
            )}
        </>
    );
}

export default AddNewUnitPage;
