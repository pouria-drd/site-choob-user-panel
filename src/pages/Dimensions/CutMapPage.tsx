import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import DimensionService from '../../services/DimensionService';
import DimensionCutMapHeader from './Headers/DimensionCutMapHeader';
import Spinner from '../../components/uiComp/spinner/Spinner';
import CutMapImageContainer from './Components/CutMapImageContainer';

interface DimensionCutMapPageParams {
    dimensionID: string;
}

function CutMapPage() {
    const navigate = useNavigate();
    const dimensionService = new DimensionService();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { dimensionID } = Object.assign({}, params) as DimensionCutMapPageParams;

    const [isHeaderDataLoading, setIsHeaderDataLoading] = useState(false);
    const [dimensionHeaderData, setDimensionHeaderData] = useState<DimensionDetailModel | undefined>();

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

            result.pvcColor = !result.pvcColor ? 'همرنگ' : result.pvcColor;
            result.description = !result.description ? 'ندارد' : result.description;

            setDimensionHeaderData(result);
        } catch (error) {
            // TODO: show toast
            console.error('Error fetching dimension details:', error);
            // Handle error as needed
        }

        setIsHeaderDataLoading(false);
    };

    const handleOnBackClicked = () => {
        if (dimensionHeaderData) navigate('/dimension/' + dimensionHeaderData.id);
    };

    useEffect(() => {
        handleLoadHeaderData();
    }, []);

    return (
        <>
            {isHeaderDataLoading && <Spinner flex={true} />}
            {!isHeaderDataLoading && (
                <div className="flex flex-col w-full font-peyda pb-20 gap-2">
                    {dimensionHeaderData ? (
                        <>
                            <DimensionCutMapHeader
                                headerData={dimensionHeaderData}
                                onBackClicked={handleOnBackClicked}
                            />

                            <CutMapImageContainer
                                dimensionId={dimensionID}
                                woodSheetCount={dimensionHeaderData.woodSheetCount}
                            />
                        </>
                    ) : (
                        <p>No data</p>
                    )}
                </div>
            )}
        </>
    );
}

export default CutMapPage;
