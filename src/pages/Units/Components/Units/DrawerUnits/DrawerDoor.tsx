import { useEffect, useState } from 'react';
import DoorColorSelect from '../DoorColorSelect';
import NumberInput from '../../../../../components/uiComp/Inputs/NumberInput';

interface DrawerDoorProp {
    index: number;
    door: DrawerDoorDTO;
    onValueChanged: (dto: DrawerDoorDTO, index: number) => void;
}
function DrawerDoor({ index, door, onValueChanged }: DrawerDoorProp) {
    const [doorDTO, setDoorDTO] = useState<DrawerDoorDTO>(door);
    const [isAutoCalc, setIsAutoCalc] = useState(true);
    const handleAutoCalc = (v: boolean) => {
        setIsAutoCalc(v);
        if (v) {
            setDoorDTO((prevDTO) => {
                return { ...prevDTO, height: 0 };
            });
        }
    };
    const handleLegColor = (v: any) => {
        setDoorDTO((prevDTO) => {
            return { ...prevDTO, Color: { colorName: v } };
        });
    };

    const handleHeightChange = (value: number) => {
        setDoorDTO((prevDTO) => {
            return { ...prevDTO, height: value ?? 0 };
        });
    };

    useEffect(() => {
        onValueChanged(doorDTO, index);
    }, [doorDTO]);

    return (
        <div className="flex gap-1 flex-col">
            {index === 0 && (
                <NumberInput
                    label={`ارتفاع کشو ${index + 1} -`}
                    type="cm"
                    value={doorDTO.height}
                    onValueChange={(v) => handleHeightChange(v)}
                />
            )}
            {index !== 0 && (
                <>
                    <div className="flex gap-1 items-center">
                        <input
                            type="checkbox"
                            checked={isAutoCalc}
                            onChange={(e) => handleAutoCalc(e.target.checked)}
                        />
                        <label>محاسبه خودکار ارتفاع</label>
                    </div>
                    {!isAutoCalc && (
                        <NumberInput
                            label={`ارتفاع کشو ${index + 1} -`}
                            type="cm"
                            value={doorDTO.height}
                            onValueChange={(v) => handleHeightChange(v)}
                        />
                    )}
                </>
            )}

            <DoorColorSelect
                title={`کشو ${index + 1}`}
                onValueChanged={handleLegColor}
                index={index}
            />
        </div>
    );
}

export default DrawerDoor;
