import { ReactNode, useEffect, useState } from 'react';
import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import BoxXYZ from '../BoxXYZ';
import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';
import UnitProjectService from '../../../../../services/UnitProjectService';
import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import UnitCalculatedCutList from '../../UnitCalculatedCutList';

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
function FixedGroundUnitWithPillar({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new UnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaultDTO = {
        depth: 0,
        width: 0,
        height: 0,
        fixedWidth: 0,
        pillarWidth: 0,
        pillarDepth: 0,
        hasHiddenHandle: false,
        hiddenHandleTopGap: 0,
        fixedWidthColor: { colorName: 'رنگ 1' },
        shelfCount: 0,
        legColor: { colorName: 'رنگ 1' },
        doors: [],
    };
    const [dto, setDTO] = useState<FixedGroundUnitWithPillarDTO>(defaultDTO);
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

    const [doors, setDoors] = useState<DoorProp[]>([{ index: 1, name: `درب 1`, value: 'رنگ 1' }]);

    const handleInputChange = (fieldName: keyof FixedGroundUnitWithPillarDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };
    const handleSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DoorProp[] = [];
        for (let i = 1; i <= dCount; i++) {
            newDoors.push({ index: i, name: `درب ${i}`, value: `رنگ 1` });
        }

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
        if (dto.depth <= 0 || dto.height <= 0 || dto.width <= 0 || dto.pillarDepth <= 0 || dto.pillarWidth <= 0) {
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

            var result = await unitProjectService.CalculatedFixedGroundUnitWithPillar<any>(dtoToSend);

            console.log('result', result);
            if (result) {
                setDimensionCutList(result.data);
                createDTO();
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
            { name: 'depth', title: 'طول ثابت', value: dto.fixedWidth.toString() + 'cm' },
            { name: 'fixedWidthColor', title: 'رنگ ثابت', value: dto.fixedWidthColor.colorName },
            { name: 'pillarWidth', title: 'طول ستون', value: dto.pillarWidth.toString() + 'cm' },
            { name: 'pillarDepth', title: 'عمق ستون', value: dto.pillarDepth.toString() + 'cm' },
            { name: 'doorCount', title: 'تعداد درب', value: dto.doors.length.toString() + ' عدد' },
        ];

        if (dto.hasHiddenHandle) {
            Props.push({ name: 'hiddenHandleTopGap', title: 'فاصله بالای درب مخفی', value: dto.hiddenHandleTopGap.toString() + 'cm' });
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
                        <div className="flex flex-col gap-2 px-2  py-2  w-full md:w-1/2">
                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">طول (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="طول (cm)"
                                    onChange={(e) => handleInputChange('width', Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col  w-full">
                                <label className="text-xs sm:text-sm md:text-base">ارتفاع (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="ارتفاع (cm)"
                                    onChange={(e) => handleInputChange('height', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">عمق (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="عمق (cm)"
                                    onChange={(e) => handleInputChange('depth', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">طول ثابت (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="طول ثابت (cm)"
                                    onChange={(e) => handleInputChange('fixedWidth', Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="ثابت"
                                    onValueChanged={handleFixedColor}
                                    index={55}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">طول ستون (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="طول ستون (cm)"
                                    onChange={(e) => handleInputChange('pillarWidth', Number(e.target.value))}
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="text-xs sm:text-sm md:text-base">عمق ستون (cm)</label>
                                <input
                                    className="base-input w-full"
                                    placeholder="عمق ستون (cm)"
                                    onChange={(e) => handleInputChange('pillarDepth', Number(e.target.value))}
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
                <UnitCalculatedCutList
                    projectId={projectId}
                    dimensionCutList={dimensionCutList}
                    isCalculating={isCalculating}
                    addUnitDTO={addUnitDTO}
                />{' '}
            </div>
        </div>
    );
}

export default FixedGroundUnitWithPillar;
