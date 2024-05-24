import { ReactNode, useEffect, useState } from 'react';

import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import WallUnitProjectService from '../../../../../services/units/WallUnitProjectService';
import UnitCalculatedCutList from '../../UnitCalculatedCutList';
import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';
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
function WallHiddenHandleUnit({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new WallUnitProjectService();

    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaultDTO = {
        depth: 0,
        width: 0,
        height: 0,
        isEvenDoors: true,
        doorExtraHeight: 0,
        bottomDoors: [{ colorName: 'رنگ 1' }],
        topDoors: [{ colorName: 'رنگ 1' }],
        bottomDoorHeight: 0,
        doorsHorizontalGap: 0,
        isTopDoorHorizontal: false,
        isBottomDoorHorizontal: false,
    };
    const [dto, setDTO] = useState<WallHiddenHandleUnitDTO>(defaultDTO);
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
    const [bottomDoors, setBottomDoors] = useState<DoorProp[]>(defaultDoorColors);
    const [topDoors, setTopDoors] = useState<DoorProp[]>(defaultDoorColors);

    const [defaultBottomDoorOption, setDefaultBottomDoorOption] = useState<DropdownOption>(doorOptions[0]);
    const [defaultTopDoorOption, setDefaultTopDoorOption] = useState<DropdownOption>(doorOptions[0]);

    const handleInputChange = (fieldName: keyof WallHiddenHandleUnitDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleIsEvenDoors = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isEvenDoors: v, bottomDoorHeight: 0 };
        });
    };

    const handleTopDoorIsHorizontal = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isTopDoorHorizontal: v, topDoors: [{ colorName: 'رنگ 1' }] };
        });

        setTopDoors(defaultDoorColors);
    };

    const handleBottomDoorIsHorizontal = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isBottomDoorHorizontal: v, bottomDoors: [{ colorName: 'رنگ 1' }] };
        });

        setBottomDoors(defaultDoorColors);
    };

    const handleTopDoorsColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, topDoors: [{ colorName: v }] };
        });

        const colorName: string = v;

        setTopDoors([
            { index: 1, name: colorName, value: colorName },
            { index: 2, name: colorName, value: colorName },
        ]);
    };

    const handleBottomDoorsColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, bottomDoors: [{ colorName: v }] };
        });
        const colorName: string = v;

        setBottomDoors([
            { index: 1, name: colorName, value: colorName },
            { index: 2, name: colorName, value: colorName },
        ]);
    };

    const handleBottomSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DoorProp[] = [];
        for (let i = 0; i < dCount; i++) {
            if (bottomDoors[i]) {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: bottomDoors[i].value });
            } else {
                newDoors.push({ index: i + 1, name: `درب ${i + 1}`, value: `رنگ 1` });
            }
        }
        setDefaultBottomDoorOption(option);
        setBottomDoors(newDoors);
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

        if (!dto.isEvenDoors) {
            if (dto.bottomDoorHeight <= 0 || !dto.bottomDoorHeight || dto.bottomDoorHeight === undefined) {
                showToast('فیلد ها تکمیل نشده اند.', ToastStatusEnum.Warning, 'خطا');
                setIsCalculating(false);
                return;
            }
        }

        try {
            let dtoToSend = dto;

            let dtoBottomDoors: SimpleColorDTO[] = [];

            bottomDoors.map((d) => {
                dtoBottomDoors.push({ colorName: d.value });
            });
            dtoToSend.bottomDoors = dtoBottomDoors;

            let dtoTopDoors: SimpleColorDTO[] = [];

            topDoors.map((d) => {
                dtoTopDoors.push({ colorName: d.value });
            });

            dtoToSend.topDoors = dtoTopDoors;

            var result = await unitProjectService.CalculatedHiddenHandleUnit<any>(dtoToSend);

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
            { name: 'doorExtraHeight', title: 'اضافه پایین درب', value: dto.doorExtraHeight.toString() + 'cm' },
        ];

        if (dto.isTopDoorHorizontal) {
            Props.push({ name: 'isTopDoorHorizontal', title: 'درب بالای داشبردی', value: dto.topDoors[0].colorName });
        } else {
            Props.push({ name: 'topDoors', title: 'درب بالا', value: dto.topDoors[0].colorName });
            Props.push({ name: 'topDoorsCount', title: 'تعداد درب بالا', value: dto.topDoors.length.toString() + 'عدد' });
        }

        if (dto.isBottomDoorHorizontal) {
            Props.push({ name: 'isBottomDoorHorizontal', title: 'درب پایین داشبردی', value: dto.bottomDoors[0].colorName });
        } else {
            Props.push({ name: 'bottomDoors', title: 'درب پایین', value: dto.bottomDoors[0].colorName });
            Props.push({ name: 'bottomDoorsCount', title: 'تعداد درب پایین', value: dto.bottomDoors.length.toString() + 'عدد' });
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
                        <div className="flex flex-col gap-4  px-2  py-2  w-full md:w-1/2">
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

                            <NumberInput
                                label="اضافه به درب پایین"
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

                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={dto.isBottomDoorHorizontal}
                                    onChange={(e) => handleBottomDoorIsHorizontal(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">درب داشبردی پایین</label>
                            </div>

                            {!dto.isBottomDoorHorizontal && (
                                <>
                                    <div className="w-full  r2l">
                                        <Dropdown
                                            title={'تعداد درب پایین'}
                                            options={doorOptions}
                                            defaultOption={defaultBottomDoorOption}
                                            onSelectOption={(opt) => handleBottomSelectedOption(opt)}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="درب پایین"
                                    onValueChanged={handleBottomDoorsColor}
                                    index={44}
                                />
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
                            {!dto.isTopDoorHorizontal && (
                                <>
                                    <div className="w-full  r2l">
                                        <Dropdown
                                            title={'تعداد درب بالا'}
                                            options={doorOptions}
                                            defaultOption={defaultTopDoorOption}
                                            onSelectOption={(opt) => handleTopSelectedOption(opt)}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="درب بالا"
                                    onValueChanged={handleTopDoorsColor}
                                    index={88}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center py-4 md:py-0">
                            <img
                                className="w-36 md:w-60"
                                src="https://cdn.sitechoob.ir/public/units/WallHiddenHandle.png"
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

export default WallHiddenHandleUnit;
