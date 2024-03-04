import { ReactNode, useEffect, useState } from 'react';

import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';
import WallUnitProjectService from '../../../../../services/units/WallUnitProjectService';
import UnitCalculatedCutList from '../../UnitCalculatedCutList';
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
function FixedWallUnit({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new WallUnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaultDTO: FixedWallUnitDTO = {
        depth: 0,
        width: 0,
        height: 0,
        fixedWidth: 0,
        hasHiddenHandle: false,
        doorExtraHeight: 0,
        fixedWidthColor: { colorName: 'رنگ 1' },
        shelfCount: 0,
        doors: [],
        isHorizontalDoor: false,
        horizontalDoorsGap: 0,
    };
    const [dto, setDTO] = useState<FixedWallUnitDTO>(defaultDTO);

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
    const [defaultDoorOption, setDefaultDoorOption] = useState<DropdownOption>(doorOptions[0]);

    const [doors, setDoors] = useState<DoorProp[]>([{ index: 1, name: `درب 1`, value: 'رنگ 1' }]);

    const handleInputChange = (fieldName: keyof FixedWallUnitDTO, value: number | SimpleColorDTO) => {
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
        for (let i = 0; i < dCount; i++) {
            if (doors[i]) {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: doors[i].value });
            } else {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: `رنگ 1` });
            }
        }
        setDefaultDoorOption(option);
        setDoors(newDoors);
    };

    const handleFixedColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, FixedWidthColor: { colorName: v } };
        });
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
        if (dto.depth <= 0 || dto.height <= 0 || dto.width <= 0 || dto.fixedWidth <= 0) {
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

            var result = await unitProjectService.CalculatedFixdedWallUnit<any>(dtoToSend);

            console.log('result', result);
            if (result) {
                setDimensionCutList(result.data);
            }
        } catch (e) {}
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
            { name: 'fixedWidth', title: 'طول ثابت', value: dto.fixedWidth.toString() + 'cm' },
            { name: 'fixedWidthColor', title: 'رنگ ثابت', value: dto.fixedWidthColor.colorName },
            { name: 'doorCount', title: 'تعداد درب', value: dto.doors.length.toString() + ' عدد' },
        ];

        if (dto.hasHiddenHandle) {
            Props.push({ name: 'doorExtraHeight', title: 'فاصله بالای درب مخفی', value: dto.doorExtraHeight.toString() + 'cm' });
        }
        if (dto.shelfCount > 0) {
            Props.push({ name: 'shelf', title: 'تعداد طبقه', value: dto.shelfCount.toString() + 'عدد' });
        }

        doors.map((d, index) => {
            Props.push({
                name: `door-${index + 1}`,
                title: d.name,
                value: d.value,
            });
        });

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
                        <div className="flex flex-col gap-3 px-2  py-2  w-full md:w-1/2">
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
                            <NumberInput
                                label="طول ثابت"
                                type="cm"
                                value={dto.fixedWidth}
                                onValueChange={(v) => handleInputChange('fixedWidth', v)}
                            />

                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="ثابت"
                                    onValueChanged={handleFixedColor}
                                    index={55}
                                />
                            </div>

                            <NumberInput
                                label="تعداد طبقه"
                                type="count"
                                value={dto.shelfCount}
                                onValueChange={(v) => handleInputChange('shelfCount', v)}
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
                                        label="اضافه پایین درب"
                                        type="cm"
                                        value={dto.doorExtraHeight}
                                        onValueChange={(v) => handleInputChange('doorExtraHeight', v)}
                                    />
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
                                src="https://cdn.sitechoob.ir/public/units/FixedWallUnit.png"
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

export default FixedWallUnit;
