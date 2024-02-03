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
        <div className="flex  items-center justify-start  rounded-lg border gap-2 p-2 bg-white r2l">
            <div className="flex gap-0 items-center justify-end w-fit text-xs sm:text-sm md:text-base">
                <h4 className="r2l whitespace-nowrap text-base md:text-base">{prop.title}</h4>
                <span>{prop.valueType !== 'bool' ? `(${prop.valueType})` : ''}</span>
            </div>

            <div className="w-full flex justify-end">
                <SettingInput
                    value={prop.value}
                    isDisabled={isEditing}
                    valueType={prop.valueType}
                    onValueChange={handleInputChange}
                />
            </div>

            <button
                onClick={handleSaveChanges}
                className="text-sc-purple-400 hover:text-white hover:bg-sc-purple-400 rounded"
                disabled={isEditing}>
                <SaveIcon />
            </button>
        </div>
    );
}

export default UnitSetting;
