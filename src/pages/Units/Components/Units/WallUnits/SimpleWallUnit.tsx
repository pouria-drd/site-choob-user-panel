import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';
import Spinner from '../../../../../components/uiComp/spinner/Spinner';
import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';
import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';
import DimensionCutList from '../../../../Dimensions/Components/DimensionCutList';
import WallUnitProjectService from '../../../../../services/units/WallUnitProjectService';

interface DropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
}
interface DoorProp {
    index: number;
    name: string;
    value: string;
}
function SimpleWallUnit({ projectId }: { projectId: string }) {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const unitProjectService = new WallUnitProjectService();

    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);
    const [dto, setDTO] = useState<SimpleWallUnitDTO>({ depth: 0, width: 0, height: 0, shelfCount: 0, hasHiddenHandle: false, doorExtraHeight: 0, doors: [] });
    const [totalCount, setTotalCount] = useState(1);
    const [description, setDescription] = useState('');

    const doorOptions: DropdownOption[] = [
        {
            label: 'یک',
            value: '1',
        },
        {
            label: 'دو',
            value: '2',
        },
    ];

    const [defaultDoorOption, setDefaultDoorOption] = useState<DropdownOption>(doorOptions[0]);

    const [doors, setDoors] = useState<DoorProp[]>([{ index: 1, name: `درب 1`, value: 'رنگ 1' }]);

    const handleInputChange = (fieldName: keyof SimpleWallUnitDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleHasHiddenDoor = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, hasHiddenHandle: v, hiddenHandleTopGap: 0 };
        });
    };
    const handleSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DoorProp[] = [];
        for (let i = 1; i <= dCount; i++) {
            newDoors.push({ index: i, name: `درب ${i}`, value: `رنگ ${i}` });
        }
        setDefaultDoorOption(option);
        setDoors(newDoors);
    };

    const handleDoorColorChange = (v: any, index: number) => {
        //loop in doors and set the dto value based on them..
        let newDoors: DoorProp[] = [];

        doors.map((d) => {
            let door = d;
            if (d.index === index) {
                d.value = v;
            }

            newDoors.push(door);
        });

        setDoors(newDoors);
    };

    const calculate = async () => {
        setIsCalculating(true);
        setDimensionCutList([]);
        if (dto.depth <= 0 || dto.height <= 0 || dto.width <= 0) {
            showToast('فیلد ها تکمیل نشده اند.', ToastStatusEnum.Warning, 'خطا');
            setIsCalculating(false);
            return;
        }

        try {
            let dtoDoors: SimpleColorDTO[] = [];

            doors.map((d) => {
                dtoDoors.push({ colorName: d.value });
            });
            let dtoToSend = dto;

            dto.doors = dtoDoors;

            var result = await unitProjectService.CalculatedSimpleWallUnit<any>(dtoToSend);

            if (result) {
                setDimensionCutList(result.data);
            }
        } catch (e) {
            const ex = e as any;

            showToast(ex.response.data.message, ToastStatusEnum.Error, 'خطا');
        }
        setIsCalculating(false);
    };

    const handleOnSave = async () => {
        if (!dimensionCutList) return;

        let Props: UnitProjectDimensionsPropsModel[] = [
            { name: 'width', title: 'طول', value: dto.width.toString() + 'cm' },
            { name: 'height', title: 'ارتفاع', value: dto.height.toString() + 'cm' },
            { name: 'depth', title: 'عمق', value: dto.depth.toString() + 'cm' },
            { name: 'doorCount', title: 'تعداد درب', value: dto.doors.length.toString() + ' عدد' },
        ];

        doors.map((d, index) => {
            Props.push({
                name: `door-${index + 1}`,
                title: d.name,
                value: d.value,
            });
        });

        const addUnit: AddUnitDTO = {
            name: 'زمینی ساده',
            projectId: projectId,
            count: totalCount,
            details: `${dto.width}x${dto.height}x${dto.depth}`,
            dimensions: dimensionCutList,
            properties: Props,
            description: description.length > 0 ? description : undefined,
        };

        try {
            var saveResult = await unitProjectService.AddUnitToProject<any>(addUnit);

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
        <div className="flex flex-col gap-2 r2l font-peyda  p-2  ">
            <h2 className="text-lg md:text-xl text-right font-semibold">یونیت دیواری ساده</h2>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col  p-2 md:p-6  bg-white  rounded-lg h-fit w-full">
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-2 p-2">
                        <div className="flex flex-col gap-3 px-2  py-2  w-full md:w-1/2">
                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">طول (سانتی متر)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="طول (سانتی متر)"
                                    onChange={(e) => handleInputChange('width', Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col  w-full">
                                <label className="text-xs sm:text-sm md:text-base">ارتفاع (سانتی متر)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="ارتفاع (سانتی متر)"
                                    onChange={(e) => handleInputChange('height', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">عمق (سانتی متر)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="عمق (سانتی متر)"
                                    onChange={(e) => handleInputChange('depth', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">تعداد طبقه</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="تعداد طبقه"
                                    onChange={(e) => handleInputChange('shelfCount', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="text-xs sm:text-sm md:text-base">درب مخفی</label>

                                    <input
                                        className="base-input w-full"
                                        type="checkbox"
                                        checked={dto.hasHiddenHandle}
                                        onChange={(e) => handleHasHiddenDoor(e.target.checked)}
                                    />
                                </div>

                                {dto.hasHiddenHandle && (
                                    <div className="flex flex-col w-full">
                                        <label className="text-xs sm:text-sm md:text-base">اضافه پایین درب(cm)</label>
                                        <input
                                            className="base-input w-full"
                                            placeholder="اضافه پایین درب(cm)"
                                            onChange={(e) => handleInputChange('doorExtraHeight', Number(e.target.value))}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="w-full  r2l">
                                <Dropdown
                                    title={'تعداد درب'}
                                    options={doorOptions}
                                    defaultOption={defaultDoorOption}
                                    onSelectOption={(opt) => handleSelectedOption(opt)}
                                />
                            </div>

                            <div className="flex flex-col gap-4 w-full ">
                                {doors.map((d, index) => (
                                    <DoorColorSelect
                                        key={index}
                                        title={d.name}
                                        onValueChanged={handleDoorColorChange}
                                        index={d.index}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center py-4 md:py-0">
                            <img
                                className="w-36 md:w-60"
                                src="https://cdn.sitechoob.ir/public/units/D-S-unita.png"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end p-2">
                        <Button
                            text={
                                <div className="flex items-center">
                                    <CalculatorIcon />
                                    محاسبه
                                </div>
                            }
                            Type={ButtonTypes.OulinedInfo}
                            isBusy={isCalculating}
                            onClick={calculate}
                        />
                    </div>
                </div>
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
            </div>
        </div>
    );
}

export default SimpleWallUnit;
