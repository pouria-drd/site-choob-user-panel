import { ReactNode, useEffect, useState } from 'react';

import UnitProjectService from '../../services/UnitProjectService';
import Spinner from '../../components/uiComp/spinner/Spinner';

import { useParams } from 'react-router-dom';
import UnitSelectionHeader from './Headers/UnitSelectionHeader';
import SimpleGroundUnit from './Components/Units/GroundUnits/SimpleGroundUnit';
import UnitUserPropsContent from '../../contents/UnitProject/UnitUserPropsContent';
import Modal from '../../components/uiComp/modals/Modal';
import WrenchIcon from '../../components/icons/WrenchIcon';
import FixedGroundUnit from './Components/Units/GroundUnits/FixedGroundUnit';
import FixedGroundUnitWithPillar from './Components/Units/GroundUnits/FixedGroundUnitWithPillar';
import SimpleGroundUnitWithPillar from './Components/Units/GroundUnits/SimpleGroundUnitWithPillar';
import SimpleOpenUnit from './Components/Units/GroundUnits/SimpleOpenUnit';
import FixedOpenUnit from './Components/Units/GroundUnits/FixedOpenUnit';
import SimpleWallUnit from './Components/Units/WallUnits/SimpleWallUnit';
import FixedWallUnit from './Components/Units/WallUnits/FixedWallUnit';
import SimpleWallUnitWithPillar from './Components/Units/WallUnits/SimpleWallUnitWithPillar';
import FixedWallUnitWithPillar from './Components/Units/WallUnits/FixedWallUnitWithPillar';
import WallCoverUnit from './Components/Units/WallUnits/WallCoverUnit';
import WallAbchekanUnit from './Components/Units/WallUnits/WallAbchekanUnit';

interface AddNewUnitPageParams {
    projectID: string;
}

function AddNewUnitPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const unitProjectService = new UnitProjectService();
    const [isLoading, setIsLoading] = useState(true);

    const [units, setUnits] = useState<UnitPropsDTO[]>([]);

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { projectID } = Object.assign({}, params) as AddNewUnitPageParams;

    const [userProps, setUserProps] = useState<UnitProjectPropsModel[]>([]);

    const [selectedUnit, setSelectedUnit] = useState<ReactNode>();

    const fetchData = async () => {
        if (!projectID) return; //TODO: redirect?
        setIsLoading(true);
        try {
            var projectPropsResult = await unitProjectService.GetUserProperties<UnitProjectPropertiesModel>();
            if (projectPropsResult) setUserProps(projectPropsResult.properties);

            var result = await unitProjectService.GetUnits<UnitPropsDTO[]>();

            if (result) setUnits(result);
        } catch (e) {}

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onUnitSelectionChanged = (unit: UnitPropsDTO) => {
        switch (unit.index) {
            case 1:
                setSelectedUnit(<SimpleGroundUnit projectId={projectID} />);
                break;
            case 2:
                setSelectedUnit(<SimpleGroundUnitWithPillar projectId={projectID} />);
                break;
            case 3:
                setSelectedUnit(<FixedGroundUnit projectId={projectID} />);
                break;
            case 4:
                setSelectedUnit(<FixedGroundUnitWithPillar projectId={projectID} />);
                break;
            case 5:
                setSelectedUnit(<SimpleOpenUnit projectId={projectID} />);
                break;
            case 6:
                setSelectedUnit(<FixedOpenUnit projectId={projectID} />);
                break;

            case 7:
                setSelectedUnit(<SimpleWallUnit projectId={projectID} />);
                break;
            case 8:
                setSelectedUnit(<FixedWallUnit projectId={projectID} />);
                break;
            case 9:
                setSelectedUnit(<SimpleWallUnitWithPillar projectId={projectID} />);
                break;
            case 10:
                setSelectedUnit(<FixedWallUnitWithPillar projectId={projectID} />);
                break;
            case 11:
                setSelectedUnit(<WallCoverUnit projectId={projectID} />);
                break;
            case 12:
                setSelectedUnit(<WallAbchekanUnit projectId={projectID} />);
                break;
            default:
                setSelectedUnit(<div className="flex">dastan</div>);
        }
    };

    return (
        <>
            {isLoading ? (
                <Spinner flex={true} />
            ) : (
                <div className="flex flex-col  gap-6 w-full font-peyda pb-16">
                    <div className="flex w-full items-center justify-start">
                        <button
                            className="py-2 px-3 base-button info"
                            onClick={openModal}>
                            مشاهده تنظیمات
                            <WrenchIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <UnitSelectionHeader
                        onSelectionChanged={onUnitSelectionChanged}
                        units={units}
                    />
                    {!selectedUnit && <div className="flex items-center justify-center bg-white rounded-lg p-4 text-center">لطفا یونیت را انتخاب کنید</div>}
                    {selectedUnit && selectedUnit}

                    {userProps && (
                        <Modal
                            title="تنظیمات عمومی پروژه"
                            isOpen={isModalOpen}
                            onClose={closeModal}>
                            <UnitUserPropsContent data={userProps} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
}

export default AddNewUnitPage;
