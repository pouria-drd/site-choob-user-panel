import { useEffect, useState } from 'react';
import { ToastStatusEnum, useToast } from '../../../components/uiComp/Toast/ToastProvider';

import SettingInput from './SettingInput';
import SaveIcon from '../../../components/icons/SaveIcon';
import UnitProjectService from '../../../services/UnitProjectService';

function UnitSetting({ data, onUpdate }: { data: UnitProjectPropsModel; onUpdate: () => void }) {
    const unitProjectService = new UnitProjectService();

    const { showToast } = useToast();
    const [prop, setProp] = useState<UnitProjectPropsModel>(data);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setProp(data);
    }, [data]);

    const handleInputChange = (v: any) => {
        if (prop.valueType === 'bool') {
            setProp((prevProp) => ({
                ...prevProp,
                valueString: v ? '1' : '0',
                value: v ? 1 : 0,
            }));
        } else {
            setProp((prevProp) => ({
                ...prevProp,
                valueString: v + prop.valueType,
                value: Number(v),
            }));
        }
    };

    const handleSaveChanges = async () => {
        setIsEditing(true);
        try {
            var result = await unitProjectService.UpdateProperties<any>(prop.index, prop.value);

            if (!result.status) showToast(result.message, ToastStatusEnum.Error);
            else {
                showToast(result.message, ToastStatusEnum.Success);
                onUpdate();
            }
        } catch (e) {
            console.log(e);
        }
        setIsEditing(false);
    };

    return (
        <div className="flex  items-center justify-start  rounded-lg border gap-2 p-2 bg-white hover:bg-sc-gray r2l w-full">
            <div className="flex gap-0 items-center justify-start text-xs sm:text-sm md:text-base w-full">
                <h4 className="r2l whitespace-pre-line text-xs md:text-base">
                    {prop.title}
                    <span>{prop.valueType !== 'bool' ? `(${prop.valueType})` : ''}</span>
                </h4>
            </div>

            <div className="flex w-fit justify-end ml-4">
                <SettingInput
                    value={prop.value}
                    isDisabled={isEditing}
                    valueType={prop.valueType}
                    onValueChange={handleInputChange}
                />
            </div>

            <button
                onClick={handleSaveChanges}
                className="text-sc-green-normal hover:text-white hover:bg-sc-green-normal rounded"
                disabled={isEditing}>
                <SaveIcon />
            </button>
        </div>
    );
}

export default UnitSetting;
