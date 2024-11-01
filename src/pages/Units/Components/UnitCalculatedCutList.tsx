import { useEffect, useState } from 'react';
import Spinner from '../../../components/uiComp/spinner/Spinner';

import UnitProjectService from '../../../services/UnitProjectService';
import { useNavigate } from 'react-router-dom';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';
import UnitCutPart from './UnitCutPart';
import StatusChip from '../../../components/uiComp/chips/StatusChip';
import { StatusEnum } from '../../../enums/StatusEnum';

interface UnitCalcProps {
    projectId: string;
    dimensionCutList: DimensionCutModel[] | undefined;
    isCalculating: boolean;
    addUnitDTO: AddUnitDTO | undefined;
}

function UnitCalculatedCutList({ dimensionCutList, isCalculating, projectId, addUnitDTO }: UnitCalcProps) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [dimensionsData, setDimensionsData] = useState<DimensionCutModel[]>([]);
    const unitProjectService = new UnitProjectService();

    const [isEdited, setIsEdited] = useState(false);
    const [totalCount, setTotalCount] = useState(1);
    const [description, setDescription] = useState('');

    const handleOnSave = async () => {
        if (!dimensionsData) return;
        if (!addUnitDTO) return;

        let dto = addUnitDTO;

        dto.count = totalCount;
        dto.description = description.length > 0 ? description : undefined;
        dto.dimensions = dimensionsData;
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

    const onEdit = (editedData: DimensionCutModel[]) => {
        setIsEdited(true);
        setDimensionsData([]);
        setTimeout(() => {
            setDimensionsData(editedData);
        }, 20);
    };

    useEffect(() => {
        if (dimensionCutList) {
            setIsEdited(false);
            setDimensionsData(dimensionCutList);
        }
    }, [dimensionCutList]);

    useEffect(() => {}, [dimensionsData]);

    return (
        <div className="flex flex-col l2r w-full  bg-white  rounded-lg">
            {!dimensionsData ? (
                <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-4">
                    <p className="">در انتظار محاسبه</p>
                    <div className="bg-sc-purple-normal duration-75 animate-pulse w-full h-full rounded-lg" />
                </div>
            ) : (
                dimensionsData.length == 0 && (
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
            {dimensionsData && dimensionsData?.length > 0 && !isCalculating && (
                <div className="flex flex-col gap-2 w-full  px-2 py-4">
                    <div className="flex flex-col  gap-2  px-2 items-end justify-between border-b pb-2">
                        <div className="flex flex-col md:flex-row gap-2 items-center text-xs sm:text-sm md:text-base  r2l w-full">
                            <div className="flex flex-col w-full md:w-1/4">
                                <label>تعداد:</label>
                                <input
                                    type="number"
                                    className="base-input w-full"
                                    placeholder="تعداد"
                                    min={1}
                                    value={totalCount}
                                    onChange={(e) => setTotalCount(Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col  w-full">
                                <label>توضیحات:</label>
                                <input
                                    type="text"
                                    className="base-input w-full"
                                    placeholder="توضیحات"
                                    maxLength={32}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex w-full justify-start">
                            <button
                                onClick={handleOnSave}
                                className="base-button outlined-success w-fit whitespace-nowrap">
                                افزودن به پروژه
                            </button>
                        </div>
                    </div>

                    {isEdited && (
                        <div className="flex items-center r2l">
                            <StatusChip
                                text="ویرایش شده"
                                type={StatusEnum.Warning}
                            />
                        </div>
                    )}

                    <UnitCutPart
                        dimensionCutData={dimensionsData}
                        isEditable={true}
                        onEdit={onEdit}
                    />
                </div>
            )}
        </div>
    );
}

export default UnitCalculatedCutList;
