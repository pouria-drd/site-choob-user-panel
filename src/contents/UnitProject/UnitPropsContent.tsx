import { useEffect, useState } from 'react';
import UnitProjectService from '../../services/UnitProjectService';
import DimensionCutList from '../../pages/Dimensions/Components/DimensionCutList';
import Spinner from '../../components/uiComp/spinner/Spinner';

const UnitPropsContent = ({ projectId, unitId }: { projectId: string; unitId: string }) => {
    const unitProjectService = new UnitProjectService();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<UnitProjectDimensionsModel>();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            var result = await unitProjectService.GetUnitDetails<UnitProjectDimensionsModel>(projectId, unitId);
            if (result) setData(result);
        } catch (e) {}
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-2 justify-center w-full md:w-[700px] p-2 r2l">
            {isLoading && <Spinner flex={true} />}
            {!isLoading && data && (
                <div className="flex flex-col divide-y divide-dashed gap-2">
                    <div className="grid grid-cols-2  md:grid-cols-4 gap-y-2 p-2 text-xs sm:text-sm md:text-base">
                        {data.properties
                            .filter((f) => f.name !== 'details')
                            .map((p, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 col-span-1 ">
                                    <p className="font-bold">{p.title}:</p>
                                    <p>{p.value}</p>
                                </div>
                            ))}
                    </div>

                    <div className="w-full l2r">
                        <DimensionCutList
                            dimensionCutData={data.dimensions}
                            isDeletable={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnitPropsContent;
