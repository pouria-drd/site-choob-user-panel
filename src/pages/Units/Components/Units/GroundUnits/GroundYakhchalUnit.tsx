import { ReactNode, useEffect, useState } from 'react';

import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import UnitCalculatedCutList from '../../UnitCalculatedCutList';
import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';
import UnitProjectService from '../../../../../services/UnitProjectService';
import NumberInput from '../../../../../components/uiComp/Inputs/NumberInput';

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
function GroundYakhchalUnit({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();

    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaultDTO: YakhchalUnitDTO = {
        depth: 0,
        width: 0,
        height: 0,
        topHeight: 0,
        topDepth: 0,
        hasHiddenHandle: false,
        doorExtraHeight: 0,
        useColorForBottom: false,
        bottomColor: { colorName: 'رنگ 1' },
        doors: [{ colorName: 'رنگ 1' }],

        isTopDoorHorizontal: false,
    };
    const [dto, setDTO] = useState<YakhchalUnitDTO>(defaultDTO);
    const [addUnitDTO, setAddUnitDTO] = useState<AddUnitDTO>();

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

    const defaultDoorColors = [{ index: 1, name: `درب 1`, value: 'رنگ 1' }];
    const [topDoors, setTopDoors] = useState<DoorProp[]>(defaultDoorColors);

    const [defaultTopDoorOption, setDefaultTopDoorOption] = useState<DropdownOption>(doorOptions[0]);

    const handleInputChange = (fieldName: keyof YakhchalUnitDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleHasHiddenDoor = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, hasHiddenHandle: v, hiddenHandleTopGap: 0 };
        });
    };

    const handleUseColorForBottom = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, useColorForBottom: !v, bottomColor: { colorName: 'رنگ 1' } };
        });
    };

    const handleTopDoorIsHorizontal = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isTopDoorHorizontal: v, doors: [{ colorName: 'رنگ 1' }] };
        });

        setDefaultTopDoorOption(doorOptions[0]);
        setTopDoors(defaultDoorColors);
    };
    const handleBottomColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, bottomColor: { colorName: v } };
        });
    };

    const handleTopDoorsColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, doors: [{ colorName: v }] };
        });

        const colorName: string = v;

        setTopDoors([{ index: 1, name: 'درب 1', value: colorName }]);
    };

    const handleDoorColorChange = (v: any, index: number) => {
        //loop in doors and set the dto value based on them..
        let newDoors: DoorProp[] = [];

        topDoors.map((d) => {
            let door = d;
            if (d.index === index) {
                d.value = v;
            }

            newDoors.push(door);
        });

        setTopDoors(newDoors);
    };

    const handleTopSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DoorProp[] = [];
        for (let i = 0; i < dCount; i++) {
            if (topDoors[i]) {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: topDoors[i].value });
            } else {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: `رنگ 1` });
            }
        }
        setDefaultTopDoorOption(option);
        setTopDoors(newDoors);
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
            let dtoToSend = dto;

            let dtoTopDoors: SimpleColorDTO[] = [];

            topDoors.map((d) => {
                dtoTopDoors.push({ colorName: d.value });
            });

            dtoToSend.doors = dtoTopDoors;

            console.log(dtoToSend);
            var result = await unitProjectService.CalculatedYakhchalUnit<any>(dtoToSend);

            console.log('calc', result);
            if (result) {
                setDimensionCutList(result.data);
            }
        } catch (e) {
            const ex = e as any;

            showToast(ex.response.data.message, ToastStatusEnum.Error, 'خطا');
        }
        setIsCalculating(false);
    };

    useEffect(() => {
        createDTO();
    }, [dimensionCutList]);

    const createDTO = async () => {
        if (!dimensionCutList) return;

        let Props: UnitProjectDimensionsPropsModel[] = [
            { name: 'width', title: 'طول', value: dto.width.toString() + 'cm' },
            { name: 'height', title: 'ارتفاع', value: dto.height.toString() + 'cm' },
            { name: 'depth', title: 'عمق', value: dto.depth.toString() + 'cm' },
        ];

        if (dto.hasHiddenHandle) {
            Props.push({ name: 'doorExtraHeight', title: 'اضافه پایین درب', value: dto.doorExtraHeight.toString() + 'cm' });
        }

        if (dto.isTopDoorHorizontal) {
            Props.push({ name: 'isTopDoorHorizontal', title: 'درب بالای داشبردی', value: dto.doors[0].colorName });
        } else {
            Props.push({ name: 'topDoors', title: 'درب بالا', value: dto.doors[0].colorName });
            Props.push({ name: 'topDoorsCount', title: 'تعداد درب بالا', value: dto.doors.length.toString() + 'عدد' });
        }

        const addUnit: AddUnitDTO = {
            name: title,
            projectId: projectId,
            count: 0,
            details: `${dto.width}x${dto.height}x${dto.depth}`,
            dimensions: [],
            properties: Props,
        };

        setAddUnitDTO(addUnit);
    };

    return (
        <div className="flex flex-col gap-2 r2l font-peyda  p-2  ">
            <h2 className="text-lg md:text-xl text-right font-semibold">{title}</h2>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col  p-2 md:p-6  bg-white  rounded-lg h-fit w-full">
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-2 p-2">
                        <div className="flex flex-col gap-3  px-2  py-2  w-full md:w-1/2">
                            <NumberInput
                                label="طول"
                                type="cm"
                                value={dto.width}
                                onValueChange={(v) => handleInputChange('width', v)}
                            />
                            <NumberInput
                                label="ارتفاع"
                                type="cm"
                                value={dto.height}
                                onValueChange={(v) => handleInputChange('height', v)}
                            />
                            <NumberInput
                                label="عمق"
                                type="cm"
                                value={dto.depth}
                                onValueChange={(v) => handleInputChange('depth', v)}
                            />

                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={!dto.useColorForBottom}
                                    onChange={(e) => handleUseColorForBottom(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">رنگ بدنه برای باکس یخچال</label>
                            </div>

                            {dto.useColorForBottom && (
                                <div className="flex flex-col gap-4 w-full ">
                                    <DoorColorSelect
                                        title="باکس یخچال"
                                        onValueChanged={handleBottomColor}
                                        index={99}
                                    />
                                </div>
                            )}

                            <NumberInput
                                label="ارتفاع بالا"
                                type="cm"
                                value={dto.topHeight}
                                onValueChange={(v) => handleInputChange('topHeight', v)}
                            />

                            <NumberInput
                                label="عمق بالا"
                                type="cm"
                                value={dto.topDepth}
                                onValueChange={(v) => handleInputChange('topDepth', v)}
                            />

                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <input
                                        className="base-input w-full"
                                        type="checkbox"
                                        checked={dto.hasHiddenHandle}
                                        onChange={(e) => handleHasHiddenDoor(e.target.checked)}
                                    />
                                    <label className="text-xs sm:text-sm md:text-base">دستگیره مخفی</label>
                                </div>

                                {dto.hasHiddenHandle && (
                                    <NumberInput
                                        label="اضافه به درب بالا"
                                        type="cm"
                                        value={dto.doorExtraHeight}
                                        onValueChange={(v) => handleInputChange('doorExtraHeight', v)}
                                    />
                                )}
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={dto.isTopDoorHorizontal}
                                    onChange={(e) => handleTopDoorIsHorizontal(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">درب بالا داشبردی</label>
                            </div>

                            {!dto.isTopDoorHorizontal && (
                                <>
                                    <div className="w-full  r2l">
                                        <Dropdown
                                            title={'تعداد درب'}
                                            options={doorOptions}
                                            defaultOption={defaultTopDoorOption}
                                            onSelectOption={(opt) => handleTopSelectedOption(opt)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 w-full ">
                                        {topDoors.map((d, index) => (
                                            <DoorColorSelect
                                                key={index}
                                                title={d.name}
                                                onValueChanged={handleDoorColorChange}
                                                index={d.index}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            {dto.isTopDoorHorizontal && (
                                <div className="flex flex-col gap-4 w-full ">
                                    <DoorColorSelect
                                        title="درب بالا"
                                        onValueChanged={handleTopDoorsColor}
                                        index={88}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full flex items-center justify-center py-4 md:py-0">
                            <img
                                className="w-36 md:w-60"
                                src="https://cdn.sitechoob.ir/public/units/YakhchalUnit.png"
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
                <UnitCalculatedCutList
                    projectId={projectId}
                    dimensionCutList={dimensionCutList}
                    isCalculating={isCalculating}
                    addUnitDTO={addUnitDTO}
                />
            </div>
        </div>
    );
}

export default GroundYakhchalUnit;
