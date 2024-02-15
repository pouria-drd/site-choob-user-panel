import { ReactNode, useEffect, useState } from 'react';
import { ButtonTypes } from '../../../../../enums/ButtonTypes';
import { ToastStatusEnum, useToast } from '../../../../../components/uiComp/Toast/ToastProvider';

import DoorColorSelect from '../DoorColorSelect';
import Button from '../../../../../components/uiComp/buttons/Button';

import Dropdown from '../../../../../components/uiComp/dropdown/Dropdown';

import CalculatorIcon from '../../../../../components/icons/CalculatorIcon';

import UnitCalculatedCutList from '../../UnitCalculatedCutList';
import DrawerUnitProjectService from '../../../../../services/units/DrawerUnitProjectService';
import DrawerDoor from './DrawerDoor';
import NumberInput from '../../../../../components/uiComp/Inputs/NumberInput';

interface DropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

function HiddenHandleDrawerUnit({ projectId, title }: { projectId: string; title: string }) {
    const { showToast } = useToast();

    const unitProjectService = new DrawerUnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);

    const defaulDTO = {
        depth: 0,
        width: 0,
        height: 0,
        isEvenDoors: false,
        topGap: 0,
        legColor: { colorName: 'رنگ 1' },
        drawerDoors: [],
    };
    const [dto, setDTO] = useState<HiddenHandleDrawerUnitDTO>(defaulDTO);

    const [addUnitDTO, setAddUnitDTO] = useState<AddUnitDTO>();

    const doorOptions: DropdownOption[] = [
        {
            label: 'دو',
            value: '2',
        },
        {
            label: 'سه',
            value: '3',
        },
    ];

    const [defaultDoorOption, setDefaultDoorOption] = useState<DropdownOption>(doorOptions[0]);

    const [drawerDoors, setDrawerDoors] = useState<DrawerDoorDTO[]>([
        { height: 0, Color: { colorName: 'رنگ 1' } },
        { height: 0, Color: { colorName: 'رنگ 1' } },
    ]);

    const handleInputChange = (fieldName: keyof HiddenHandleDrawerUnitDTO, value: number | SimpleColorDTO) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleIsEvenDoors = (v: boolean) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, isEvenDoors: v };
        });
    };

    const handleSelectedOption = (option: DropdownOption) => {
        const dCount = Number(option.value);
        let newDoors: DrawerDoorDTO[] = [];
        for (let i = 0; i < dCount; i++) {
            if (drawerDoors[i]) {
                newDoors.push(drawerDoors[i]);
            } else {
                newDoors.push({ height: 0, Color: { colorName: 'رنگ 1' } });
            }
        }

        setDefaultDoorOption(option);

        setDrawerDoors(newDoors);
    };

    const handleLegColor = (v: any) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, legColor: { colorName: v } };
        });
    };

    const handleDoorColorChange = (v: DrawerDoorDTO, index: number) => {
        let newDoors: DrawerDoorDTO[] = [];

        drawerDoors.map((d, dindex) => {
            let door = d;
            if (dindex === index) {
                door.height = v.height;
                door.Color = v.Color;
            }

            newDoors.push(door);
        });
        setDrawerDoors(newDoors);
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
            let dtoDoors: DrawerDoorDTO[] = [];

            drawerDoors.map((d) => {
                dtoDoors.push(d);
            });
            let dtoToSend = dto;

            dto.drawerDoors = dtoDoors;

            var result = await unitProjectService.CalculateHiddenHandleDrawerUnit<any>(dtoToSend);

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
            { name: 'doorCount', title: 'تعداد کشو', value: dto.drawerDoors.length.toString() + ' عدد' },
        ];

        /* doors.map((d, index) => {
            Props.push({
                name: `door-${index + 1}`,
                title: d.name,
                value: d.value,
            });
        });*/

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
        <div className="flex flex-col gap-2 r2l font-peyda  p-2">
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

                            <div className="flex flex-col gap-4 w-full ">
                                <DoorColorSelect
                                    title="پاخور"
                                    onValueChanged={handleLegColor}
                                    index={10}
                                />
                            </div>

                            <NumberInput
                                label="بالای دستگیره مخفی"
                                type="cm"
                                value={dto.depth}
                                onValueChange={(v) => handleInputChange('topGap', v)}
                            />

                            <div className="w-full  r2l">
                                <Dropdown
                                    title={'تعداد کشو'}
                                    options={doorOptions}
                                    defaultOption={defaultDoorOption}
                                    onSelectOption={(opt) => handleSelectedOption(opt)}
                                />
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <input
                                    className="base-input w-full"
                                    type="checkbox"
                                    checked={dto.isEvenDoors}
                                    onChange={(e) => handleIsEvenDoors(e.target.checked)}
                                />
                                <label className="text-xs sm:text-sm md:text-base">کشوهای مساوی</label>
                            </div>
                            {!dto.isEvenDoors && (
                                <div className="flex flex-col gap-4 w-full ">
                                    {drawerDoors.map((d, index) => (
                                        <DrawerDoor
                                            index={index}
                                            door={d}
                                            onValueChanged={(d, index) => handleDoorColorChange(d, index)}
                                        />
                                    ))}
                                </div>
                            )}
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

export default HiddenHandleDrawerUnit;
