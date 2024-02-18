import { ReactNode, useEffect, useState } from 'react';
import Dropdown from '../../components/uiComp/dropdown/Dropdown';

interface DropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
}
const ProjectPropSelect = ({ prop, dimensionsList, onSelectionChanged }: { prop: UnitProjectPropsModel; dimensionsList: WoodSheetDimension[]; onSelectionChanged: (dimensionId: number, propIndex: number) => void }) => {
    const [options, setOptions] = useState<DropdownOption[]>([]);

    const [defaultOption, setDefaultOption] = useState<DropdownOption>();

    const handleSelectedOption = (option: DropdownOption) => {
        const selectedDimensionID = Number(option.value);

        onSelectionChanged(selectedDimensionID, prop.index);
    };

    useEffect(() => {
        const newOptions = dimensionsList.map((item) => ({
            label: item.dimensions,
            value: item.id.toString(),
        }));
        setOptions(newOptions);

        const relatedDimensionOption = newOptions.find((op) => Number(op.value) === prop.value);

        setDefaultOption(relatedDimensionOption);
    }, []);

    return (
        <div className="w-full">
            <Dropdown
                title={'ابعاد ورق ' + prop.title}
                options={options}
                defaultOption={defaultOption}
                onSelectOption={(opt) => handleSelectedOption(opt)}
            />
        </div>
    );
};

export default ProjectPropSelect;
