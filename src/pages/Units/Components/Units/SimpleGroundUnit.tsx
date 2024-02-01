import { ReactNode, useState } from 'react';
import Dropdown from '../../../../components/uiComp/dropdown/Dropdown';
import DoorColorSelect from './DoorColorSelect';
import UnitProjectService from '../../../../services/UnitProjectService';
import DimensionCutList from '../../../Dimensions/Components/DimensionCutList';
import Button from '../../../../components/uiComp/buttons/Button';
import CalculatorIcon from '../../../../components/icons/CalculatorIcon';
import { ButtonTypes } from '../../../../enums/ButtonTypes';

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
function SimpleGroundUnit() {
    const unitProjectService = new UnitProjectService();
    const [dimensionCutList, setDimensionCutList] = useState<DimensionCutModel[] | undefined>();
    const [isCalculating, setIsCalculating] = useState(false);
    const [dto, setDTO] = useState<SimpleGroundUnitDTO>({ depth: 0, width: 0, height: 0, doors: [] });

    const [doorOptions, setDoorOptions] = useState<DropdownOption[]>([
        {
            label: 'یک',
            value: '1',
        },
        {
            label: 'دو',
            value: '2',
        },
    ]);

    const [doors, setDoors] = useState<DoorProp[]>([{ index: 1, name: `درب 1`, value: 'رنگ 1' }]);

    const handleInputChange = (fieldName: keyof SimpleGroundUnitDTO, value: number | SimpleDoorDTO) => {
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
        console.log(dto);
        if (dto.depth === 0 || dto.height === 0 || dto.width == 0) return;
        setIsCalculating(true);
        try {
            let dtoDoors: SimpleDoorDTO[] = [];

            doors.map((d) => {
                dtoDoors.push({ colorName: d.value });
            });
            let dtoToSend = dto;

            dto.doors = dtoDoors;

            var result = await unitProjectService.CalculatedSimpleGroundUnit<any>(dtoToSend);

            if (result) {
                setDimensionCutList(result.data);
            }
        } catch (e) {}
        setIsCalculating(false);
    };

    return (
        <div className="flex flex-col gap-2 r2l font-peyda  p-2">
            <h2 className="text-lg md:text-xl text-right font-semibold">تنظیمات یونیت زمینی ساده</h2>

            <div className="grid gird-cols-1 gap-x-40 md:grid-cols-3 bg-white  rounded-lg p-6">
                <div className="flex flex-col items-end  gap-2 px-6 py-2 w-full col-span-3 md:col-span-1">
                    <div className="flex flex-col w-full">
                        <label>طول (سانتی متر)</label>
                        <input
                            className="base-input"
                            placeholder="طول (سانتی متر)"
                            onChange={(e) => handleInputChange('width', Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>عرض (سانتی متر)</label>
                        <input
                            className="base-input w-full "
                            placeholder="عرض (سانتی متر)"
                            onChange={(e) => handleInputChange('height', Number(e.target.value))}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label>عمق (سانتی متر)</label>
                        <input
                            className="base-input w-full "
                            placeholder="عمق (سانتی متر)"
                            onChange={(e) => handleInputChange('depth', Number(e.target.value))}
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
                <div className="col-span-3 flex justify-end">
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
            <div className="flex flex-col l2r w-full">
                {dimensionCutList && !isCalculating && (
                    <DimensionCutList
                        dimensionCutData={dimensionCutList}
                        isDeletable={false}
                    />
                )}
            </div>
        </div>
    );
}

export default SimpleGroundUnit;
