import { ReactNode, useEffect, useState } from 'react';

import UnitProjectService from '../../services/UnitProjectService';
import Spinner from '../../components/uiComp/spinner/Spinner';

import { useParams } from 'react-router-dom';
import UnitSelectionHeader from './Headers/UnitSelectionHeader';
import UnitUserPropsContent from '../../contents/UnitProject/UnitUserPropsContent';
import Modal from '../../components/uiComp/modals/Modal';

import QuestionIcon from '../../components/icons/QuestionIcon';

interface AddNewUnitPageParams {
    projectID: string;
}

function AddNewUnitPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const unitProjectService = new UnitProjectService();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingUnit, setIsLoadingUnit] = useState(false);

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
        } catch (e) {}

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const unitCategorySelected = (unitCat: any) => {
        if (unitCat) {
            setIsLoadingUnit(true);
            setSelectedUnit(unitCat);
            setTimeout(() => {
                setIsLoadingUnit(false);
            }, 200);
        } else setSelectedUnit(null);
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
                            تنظیمات یونیت
                            <QuestionIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <UnitSelectionHeader
                        onSelectionChanged={unitCategorySelected}
                        projectID={projectID}
                    />
                    {!selectedUnit && <div className="flex items-center justify-center bg-white rounded-lg p-4 text-center">لطفا یونیت را انتخاب کنید</div>}
                    {isLoadingUnit && (
                        <div className="flex h-10 items-center justify-center">
                            {' '}
                            <Spinner flex={true} />
                        </div>
                    )}
                    {!isLoadingUnit && selectedUnit && selectedUnit}

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
