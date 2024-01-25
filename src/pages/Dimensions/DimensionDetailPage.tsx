import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Modal from '../../components/uiComp/modals/Modal';
import Spinner from '../../components/uiComp/spinner/Spinner';

import DimensionNewCut from './Components/DimensionNewCut';
import DimensionCutList from './Components/DimensionCutList';
import DimensionService from '../../services/DimensionService';
import DimensionDetailHeader from './Headers/DimensionDetailHeader';
import CopyCutDimension from '../../contents/dimensions/CopyCutDimension';
import DimensionIsCalculating from '../../contents/dimensions/DimensionIsCalculating';

interface DimensionDetailPageParams {
    dimensionID: string;
}

function DimensionDetailPage() {
    const navigate = useNavigate();
    const dimensionService = new DimensionService();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openCopyModal = () => setIsModalOpen(true);

    const closeCopyModal = () => {
        setIsModalOpen(false)
    };


    const onSuccessCopy = (copyDimensionId: string) => {
        setIsModalOpen(false);
        navigate("/dimension/" + copyDimensionId);
    };

    const [canSendProcessRequest, setCanSendProcessRequest] = useState(false);
    const [dimensionHeaderData, setDimensionHeaderData] = useState<DimensionDetailModel | undefined>();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { dimensionID } = Object.assign({}, params) as DimensionDetailPageParams;

    const [isCutListLoading, setIsCutListLoading] = useState(false);
    const [isHeaderDataLoading, setIsHeaderDataLoading] = useState(false);

    const [isCalculating, setIsCalculating] = useState(false);

    const handleLoadHeaderData = async () => {
        setIsHeaderDataLoading(true);

        try {
            let result = await dimensionService.GetDimensionDetails<DimensionDetailModel>(dimensionID, false);

            // Handle the case where result is undefined
            if (!result) {
                // TODO: show toast
                console.error('Error: Dimension detail not found');
                return;
            }

            if (result.isConfirmed) {
                setIsCalculating(false);
            } else {
                if (result.isProccessing) {
                    console.log('is going to set time out');
                    setTimeout(() => {
                        console.log('timeoutSet');
                        handleLoadHeaderData();
                    }, 4000);
                    return;
                }
            }

            result.pvcColor = !result.pvcColor ? 'همرنگ' : result.pvcColor;
            result.description = !result.description ? 'ندارد' : result.description;

            setDimensionHeaderData(result);
        } catch (error) {
            // TODO: show toast
            console.error('Error fetching dimension details:', error);
            // Handle error as needed
        }

        setIsHeaderDataLoading(false);
        handleLoadCutListData();
    };

    const handleLoadCutListData = async () => {
        setIsCutListLoading(true);

        try {
            let result = await dimensionService.GetDimensionDetails<DimensionDetailModel>(dimensionID, true);

            // Handle the case where result is undefined
            if (!result) {
                // TODO: show toast
                console.error('Error: Dimension detail not found');
                return;
            }

            setDimensionCutList(result.dimensions);

            if (result.dimensions && result.dimensions.length > 0) {
                setCanSendProcessRequest(true);
            } else {
                setCanSendProcessRequest(false);
            }

            //reset the header
            result.dimensions = [];
            setDimensionHeaderData(result);
        } catch (error) {
            // TODO: show toast
            console.error('Error fetching dimension details:', error);
            // Handle error as needed
        }

        setIsCutListLoading(false);
    };

    const handleCalculateClick = () => {
        if (!dimensionHeaderData) return;
        setIsCalculating(true);
        dimensionService.CalculateDimensionList(dimensionHeaderData?.id);
        handleLoadHeaderData();
    };

    const handleCutMapClick = () => {
        if (!dimensionHeaderData) return;
        navigate("/dimension/cut-map/" + dimensionHeaderData.id);
    };



    useEffect(() => {
        handleLoadHeaderData();
    }, [isCalculating, dimensionID]);

    return (
        <>
            {isCalculating && <DimensionIsCalculating />}
            {!isCalculating && (
                <>
                    {isHeaderDataLoading && <Spinner flex={true} />}
                    {!isHeaderDataLoading && (
                        <div className="flex flex-col w-full font-peyda pb-20 gap-2">
                            {dimensionHeaderData ? (
                                <>
                                    <DimensionDetailHeader
                                        headerData={dimensionHeaderData}
                                        onUpdate={handleLoadHeaderData}
                                        canSendProcessRequest={canSendProcessRequest}
                                        onCalculateClicked={handleCalculateClick}
                                        onCutMapClicked={handleCutMapClick}
                                        onCopyClicked={openCopyModal}
                                    />

                                    {!dimensionHeaderData.sentForCut && (
                                        <DimensionNewCut
                                            dimensionId={dimensionID}
                                            onUpdate={handleLoadCutListData}
                                        />
                                    )}

                                    {isCutListLoading && (
                                        <Spinner
                                            flex={true}
                                            containerCss="py-10 bg-white rounded-lg"
                                        />
                                    )}

                                    {!isCutListLoading && dimensionCutList && (
                                        <DimensionCutList
                                            dimensionCutData={dimensionCutList}
                                            isDeletable={!dimensionHeaderData.sentForCut}
                                            onDelete={handleLoadCutListData}
                                            dimensionId={dimensionHeaderData.id}
                                        />
                                    )}
                                </>
                            ) : (
                                <p>no data</p>
                            )}
                        </div>
                    )}
                </>
            )}

            {dimensionHeaderData && dimensionHeaderData.sentForCut &&
                <Modal
                    title={`کپی از: ${dimensionHeaderData?.title}`}
                    isOpen={isModalOpen}
                    onClose={closeCopyModal}>
                    <CopyCutDimension dimensionID={dimensionHeaderData?.id} onSuccess={onSuccessCopy} />
                </Modal>
            }
        </>
    );
}

export default DimensionDetailPage;
