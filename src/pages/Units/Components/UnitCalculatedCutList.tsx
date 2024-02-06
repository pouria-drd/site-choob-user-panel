import { useState } from 'react';
import Spinner from '../../../components/uiComp/spinner/Spinner';
import DimensionCutList from '../../Dimensions/Components/DimensionCutList';
import UnitProjectService from '../../../services/UnitProjectService';
import { useNavigate } from 'react-router-dom';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

interface UnitCalcProps {
    projectId: string;
    dimensionCutList: DimensionCutModel[] | undefined;
    isCalculating: boolean;
    addUnitDTO: AddUnitDTO | undefined;
}

function UnitCalculatedCutList({ dimensionCutList, isCalculating, projectId, addUnitDTO }: UnitCalcProps) {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();

    const [totalCount, setTotalCount] = useState(1);
    const [description, setDescription] = useState('');

    const handleOnSave = async () => {
        if (!dimensionCutList) return;
        if (!addUnitDTO) return;

        let dto = addUnitDTO;

        dto.count = totalCount;
        dto.description = description.length > 0 ? description : undefined;
        dto.dimensions = dimensionCutList;
        try {
            var saveResult = await unitProjectService.AddUnitToProject<any>(dto);

            if (saveResult) {
                if (saveResult.status) {
                    showToast(saveResult.message, ToastStatusEnum.Success, 'عملیات موفقیت آمیز بود');
                    navigate('/unit-project/' + projectId);
                } else {
                    showToast(saveResult.message, ToastStatusEnum.Error, 'خطا');
                }
            }
        } catch (e) {}
    };
    return (
        <div className="flex flex-col l2r w-full  bg-white  rounded-lg">
            {!dimensionCutList ? (
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-4">
                    <p className="">در انتظار محاسبه</p>
                    <div className="bg-sc-purple-normal duration-75 animate-pulse w-full h-full rounded-lg" />
                </div>
            ) : (
                dimensionCutList.length == 0 && (
                    <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-4">
                        <p className="">در انتظار محاسبه</p>
                        <div className="bg-sc-purple-normal duration-75 animate-pulse w-full h-full rounded-lg" />
                    </div>
                )
            )}
            {isCalculating && (
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-2">
                    <Spinner flex={true} />
                </div>
            )}
            {dimensionCutList && dimensionCutList?.length > 0 && !isCalculating && (
                <div className="flex flex-col gap-2 w-full  px-2 py-4">
                    <div className="flex flex-col  gap-2  px-2 items-end justify-between border-b pb-2">
                        <div className="flex flex-col  r2l w-full">
                            <label className="text-xs sm:text-sm md:text-base">تعداد</label>
                            <input
                                type="number"
                                className="base-input w-full md:w-1/4"
                                placeholder="تعداد"
                                min={1}
                                value={totalCount}
                                onChange={(e) => setTotalCount(Number(e.target.value))}
                            />
                            <label className="text-xs sm:text-sm md:text-base mt-2">توضیحات</label>
                            <input
                                type="text"
                                className="base-input w-full"
                                placeholder="توضیحات"
                                maxLength={32}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex w-full justify-start">
                            <button
                                onClick={handleOnSave}
                                className="base-button outlined-success w-fit whitespace-nowrap">
                                افزودن به پروژه
                            </button>
                        </div>
                    </div>
                    <DimensionCutList
                        dimensionCutData={dimensionCutList}
                        isDeletable={false}
                    />
                </div>
            )}
        </div>
    );
}

export default UnitCalculatedCutList;
