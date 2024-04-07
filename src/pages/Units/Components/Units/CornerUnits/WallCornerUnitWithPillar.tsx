import { useEffect, useState } from 'react';
import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import UnitCalculatedCutList from '../../UnitCalculatedCutList';
import NumberInput from '../../../../../components/uiComp/Inputs/NumberInput';
import CornerUnitProjectService from '../../../../../services/units/CornerUnitProjectService';

interface DoorProp {
    index: number;
    name: string;
    value: string;
}
function WallCornerUnitWithPillar({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new CornerUnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaulDTO: WallCornerWithPillarDTO = {
        rightWidth: 0,
        leftWidth: 0,
        height: 0,
        rightDepth: 0,
        leftDepth: 0,
        shelfCount: 0,
        legColor: { colorName: 'رنگ 1' },
        doors: [],
        pillarWidth: 0,
        pillarDepth: 0,
        hasHiddenHandle: false,
        doorExtraHeight: 0,
    };
    const [dto, setDTO] = useState<WallCornerWithPillarDTO>(defaulDTO);

    const [addUnitDTO, setAddUnitDTO] = useState<AddUnitDTO>();

    const [doors, setDoors] = useState<DoorProp[]>([
        { index: 1, name: `درب 1`, value: 'رنگ 1' },
        { index: 2, name: `درب 2`, value: 'رنگ 2' },
    ]);

    const handleInputChange = (fieldName: keyof WallCornerWithPillarDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
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

    const handleHasHiddenDoor = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, hasHiddenHandle: v, hiddenHandleTopGap: 0 };
        });
    };

    const calculate = async () => {
        setIsCalculating(true);
        setDimensionCutList([]);
        if (dto.rightWidth <= 0 || dto.rightDepth <= 0 || dto.height <= 0 || dto.leftWidth <= 0 || dto.leftDepth <= 0) {
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

            var result = await unitProjectService.CalculatedGroundSimpleCornerUnit<any>(dtoToSend);

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
            { name: 'width', title: 'طول راست', value: dto.rightWidth.toString() + 'cm' },
            { name: 'width', title: 'طول چپ', value: dto.leftWidth.toString() + 'cm' },
            { name: 'height', title: 'ارتفاع', value: dto.height.toString() + 'cm' },
            { name: 'depth', title: 'عمق راست', value: dto.rightDepth.toString() + 'cm' },
            { name: 'depth', title: 'عمق چپ', value: dto.leftDepth.toString() + 'cm' },
            { name: 'pillarWidth', title: 'طول ستون', value: dto.pillarWidth.toString() + 'cm' },
            { name: 'pillarDepth', title: 'عمق ستون', value: dto.pillarDepth.toString() + 'cm' },

            { name: 'doorCount', title: 'تعداد درب', value: dto.doors.length.toString() + ' عدد' },
        ];

        if (dto.hasHiddenHandle) {
            Props.push({ name: 'doorExtraHeight', title: 'اضافه پایین درب', value: dto.doorExtraHeight.toString() + 'cm' });
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
            details: `${dto.rightWidth}-${dto.leftWidth}x${dto.height}x${dto.rightDepth}-${dto.leftDepth}`,
            dimensions: [],
            properties: Props,
        };

        setAddUnitDTO(addUnit);
    };

    return (
        <div className="flex flex-col gap-2 r2l font-peyda  p-2">
            <h2 className="text-lg md:text-xl text-right font-semibold">{title}</h2>

            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex flex-col  p-2 md:p-6  bg-white  rounded-lg h-fit w-full">
                    <div className="flex flex-col sm:flex-row justify-around items-center gap-2 p-2">
                        <div className="flex flex-col gap-3 px-2  py-2  w-full md:w-1/2">
                            <NumberInput
                                label="طول راست"
                                type="cm"
                                value={dto.rightWidth}
                                onValueChange={(v) => handleInputChange('rightWidth', v)}
                            />

                            <NumberInput
                                label="طول چپ"
                                type="cm"
                                value={dto.rightWidth}
                                onValueChange={(v) => handleInputChange('leftWidth', v)}
                            />

                            <NumberInput
                                label="عمق"
                                type="cm"
                                value={dto.rightDepth}
                                onValueChange={(v) => handleInputChange('rightDepth', v)}
                            />

                            <NumberInput
                                label="عمق"
                                type="cm"
                                value={dto.leftDepth}
                                onValueChange={(v) => handleInputChange('leftDepth', v)}
                            />

                            <NumberInput
                                label="ارتفاع"
                                type="cm"
                                value={dto.height}
                                onValueChange={(v) => handleInputChange('height', v)}
                            />
                            <NumberInput
                                label="طول ستون"
                                type="cm"
                                value={dto.pillarWidth}
                                onValueChange={(v) => handleInputChange('pillarWidth', v)}
                            />

                            <NumberInput
                                label="عمق ستون"
                                type="cm"
                                value={dto.pillarDepth}
                                onValueChange={(v) => handleInputChange('pillarDepth', v)}
                            />

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
                                src="https://cdn.sitechoob.ir/public/units/GroundCornerUnitWithPillar.png"
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
                    addUnitDTO={addUnitDTO}
                    dimensionCutList={dimensionCutList}
                    isCalculating={isCalculating}
                />
            </div>
        </div>
    );
}

export default WallCornerUnitWithPillar;
