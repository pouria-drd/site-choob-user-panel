import { useEffect, useState } from 'react';
import DoorColorSelect from '../DoorColorSelect';

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
                <div className="flex flex-col w-full">
                    <label className="text-xs sm:text-sm md:text-base">ارتفاع کشو {index + 1}</label>
                    <input
                        className="base-input w-full"
                        placeholder={`ارتفاع کشو ${index + 1}`}
                        onChange={(e) => handleHeightChange(Number(e.target.value))}
                    />
                </div>
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
                        <div className="flex flex-col w-full">
                            <label className="text-xs sm:text-sm md:text-base">ارتفاع کشو {index + 1}</label>
                            <input
                                className="base-input w-full"
                                placeholder={`ارتفاع کشو ${index + 1}`}
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                            />
                        </div>
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
