import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import BoxXYZ from '../BoxXYZ';
import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';
import Spinner from '../../../../../components/uiComp/spinner/Spinner';
import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';
import UnitProjectService from '../../../../../services/UnitProjectService';
import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';
import DimensionCutList from '../../../../Dimensions/Components/DimensionCutList';

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
function FixedGroundUnit({ projectId }: { projectId: string }) {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);
    const [dto, setDTO] = useState<FixedGroundUnitDTO>({ depth: 55, width: 100, height: 72, fixedWidth: 35, FixedWidthColor: { colorName: 'رنگ 1' }, shelfCount: 1, doors: [] });
    const [totalCount, setTotalCount] = useState(1);

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

    const [doors, setDoors] = useState<DoorProp[]>([{ index: 1, name: `درب 1`, value: 'رنگ 1' }]);

    const handleInputChange = (fieldName: keyof FixedGroundUnitDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };
    const handleSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DoorProp[] = [];
        for (let i = 1; i <= dCount; i++) {
            newDoors.push({ index: i, name: `درب ${i}`, value: `رنگ ${i}` });
        }

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
        if (dto.depth === 0 || dto.height === 0 || dto.width == 0) return;
        setIsCalculating(true);
        try {
            let dtoDoors: SimpleColorDTO[] = [];

            doors.map((d) => {
                dtoDoors.push({ colorName: d.value });
            });
            let dtoToSend = dto;

            dto.doors = dtoDoors;

            var result = await unitProjectService.CalculatedFixedGroundUnit<any>(dtoToSend);

            console.log('result', result);
            if (result) {
                setDimensionCutList(result.data);
            }
        } catch (e) {}
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
            name: 'زمینی با ثابت',
            projectId: projectId,
            count: totalCount,
            details: `${dto.width}x${dto.height}x${dto.depth}`,
            dimensions: dimensionCutList,
            properties: Props,
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
            <h2 className="text-lg md:text-xl text-right font-semibold">یونیت زمینی با ثابت</h2>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col  p-2 md:p-6  bg-white  rounded-lg h-fit w-full">
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-2 p-2">
                        <div className="flex flex-col gap-2 px-2  py-2  w-full md:w-1/2">
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

                            <div className="w-full  r2l">
                                <Dropdown
                                    title={'تعداد درب'}
                                    options={doorOptions}
                                    defaultOption={doorOptions[0]}
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
                        <div className="w-full flex items-center justify-center">
                            <BoxXYZ
                                width={dto.width}
                                height={dto.height}
                                depth={dto.depth}
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
                    {!dimensionCutList && (
                        <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-4">
                            <p className="">در انتظار محاسبه</p>
                            <div className="bg-sc-purple-normal duration-75 animate-pulse w-full h-full rounded-lg" />
                        </div>
                    )}
                    {isCalculating && (
                        <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-2">
                            <Spinner flex={true} />
                        </div>
                    )}
                    {dimensionCutList && !isCalculating && (
                        <div className="flex flex-col gap-2 w-full  px-2 py-4">
                            <div className="flex px-6 justify-between">
                                <button
                                    onClick={handleOnSave}
                                    className="base-button outlined-success w-fit">
                                    افزودن به پروژه
                                </button>
                                <input
                                    type="number"
                                    className="base-input"
                                    placeholder="تعداد"
                                    min={1}
                                    value={totalCount}
                                    onChange={(e) => setTotalCount(Number(e.target.value))}
                                />
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

export default FixedGroundUnit;
