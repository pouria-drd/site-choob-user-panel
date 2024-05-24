import { useEffect, useState } from 'react';

import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import WallUnitProjectService from '../../../../../services/units/WallUnitProjectService';
import UnitCalculatedCutList from '../../UnitCalculatedCutList';
import NumberInput from '../../../../../components/uiComp/Inputs/NumberInput';

interface DoorProp {
    index: number;
    name: string;
    value: string;
}
function WallAbchekanUnit({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new WallUnitProjectService();

    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaultDTO = {
        depth: 0,
        width: 0,
        height: 0,
        hasHiddenHandle: false,
        isEvenDoors: true,
        doorExtraHeight: 0,
        bottomDoorColor: { colorName: 'رنگ 1' },
        topHorizontalDoorColor: { colorName: 'رنگ 1' },
        bottomDoorHeight: 0,
        doorsHorizontalGap: 0,
        isTopDoorHorizontal: false,
        doors: [],
    };
    const [dto, setDTO] = useState<WallAbchekanDTO>(defaultDTO);
    const [addUnitDTO, setAddUnitDTO] = useState<AddUnitDTO>();

    const defaultDoorColors = [
        { index: 1, name: `درب 1`, value: 'رنگ 1' },
        { index: 2, name: `درب 2`, value: 'رنگ 1' },
    ];
    const [doors, setDoors] = useState<DoorProp[]>(defaultDoorColors);

    const handleInputChange = (fieldName: keyof WallAbchekanDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleHasHiddenDoor = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, hasHiddenHandle: v, doorExtraHeight: 0 };
        });
    };

    const handleIsEvenDoors = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isEvenDoors: v, bottomDoorHeight: 0 };
        });
    };

    const handleTopDoorIsHorizontal = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isTopDoorHorizontal: v, topHorizontalDoorColor: { colorName: 'رنگ 1' } };
        });

        setDoors(defaultDoorColors);
    };

    const handleHorizontalDoorColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, topHorizontalDoorColor: { colorName: v } };
        });
    };

    const handleBottomDoorColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, bottomDoorColor: { colorName: v } };
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
        if (dto.depth <= 0 || dto.height <= 0 || dto.width <= 0) {
            showToast('فیلد ها تکمیل نشده اند.', ToastStatusEnum.Warning, 'خطا');
            setIsCalculating(false);
            return;
        }

        if (dto.hasHiddenHandle) {
            if (dto.doorsHorizontalGap <= 0 || dto.doorExtraHeight <= 0) {
                showToast('فیلد ها تکمیل نشده اند.', ToastStatusEnum.Warning, 'خطا');
                setIsCalculating(false);
                return;
            }
        }

        try {
            let dtoDoors: SimpleColorDTO[] = [];

            doors.map((d) => {
                dtoDoors.push({ colorName: d.value });
            });
            let dtoToSend = dto;

            dto.doors = dtoDoors;

            var result = await unitProjectService.CalculatedAbchekanUnit<any>(dtoToSend);

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
            { name: 'bottomDoorHeight', title: 'ارتفاع درب پایین', value: dto.bottomDoorHeight + 'cm' },
            { name: 'doorsHorizonatalGap', title: 'فاصله درب های بالا و پایین', value: dto.doorsHorizontalGap + 'cm' },
        ];

        if (dto.hasHiddenHandle) {
            Props.push({ name: 'doorExtraHeight', title: 'اضافه پایین درب', value: dto.doorExtraHeight.toString() + 'cm' });
        }

        if (dto.isTopDoorHorizontal) {
            Props.push({ name: 'isTopDoorHorizontal', title: 'درب بالای داشبردی', value: dto.topHorizontalDoorColor.toString() });
        } else {
            Props.push({ name: 'door1', title: 'درب راست', value: dto.doors[0].colorName });
            Props.push({ name: 'door2', title: 'درب چپ', value: dto.doors[1].colorName });
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

                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={dto.isEvenDoors}
                                    onChange={(e) => handleIsEvenDoors(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">محاسبه مساوی درب ها</label>
                            </div>
                            {!dto.isEvenDoors && (
                                <NumberInput
                                    label="ارتفاع درب پایین"
                                    type="cm"
                                    value={dto.bottomDoorHeight}
                                    onValueChange={(v) => handleInputChange('bottomDoorHeight', v)}
                                />
                            )}

                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="درب پایین"
                                    onValueChanged={handleBottomDoorColor}
                                    index={55}
                                />
                            </div>

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
                                    <>
                                        <NumberInput
                                            label="اضافه پایین درب"
                                            type="cm"
                                            value={dto.doorExtraHeight}
                                            onValueChange={(v) => handleInputChange('doorExtraHeight', v)}
                                        />
                                        <NumberInput
                                            label="فاصله بین درب بالا و پایین"
                                            type="cm"
                                            value={dto.doorsHorizontalGap}
                                            onValueChange={(v) => handleInputChange('doorsHorizontalGap', v)}
                                        />
                                    </>
                                )}
                            </div>

                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={dto.isTopDoorHorizontal}
                                    onChange={(e) => handleTopDoorIsHorizontal(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">درب داشبردی بالا</label>
                            </div>

                            {dto.isTopDoorHorizontal && (
                                <div className="flex flex-col gap-4 w-full ">
                                    <DoorColorSelect
                                        title="درب داشبردی"
                                        onValueChanged={handleHorizontalDoorColor}
                                        index={88}
                                    />
                                </div>
                            )}

                            {!dto.isTopDoorHorizontal && (
                                <>
                                    <div className="flex flex-col gap-4 w-full ">
                                        <DoorColorSelect
                                            title="درب راست"
                                            onValueChanged={handleDoorColorChange}
                                            index={1}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-4 w-full ">
                                        <DoorColorSelect
                                            title="درب چپ"
                                            onValueChanged={handleDoorColorChange}
                                            index={2}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full flex items-center justify-center py-4 md:py-0">
                            <img
                                className="w-36 md:w-60"
                                src="https://cdn.sitechoob.ir/public/units/WallAbchekan.png"
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

export default WallAbchekanUnit;
