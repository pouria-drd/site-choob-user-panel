import { useNavigate } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';

import Button from '../../components/uiComp/buttons/Button';
import Spinner from '../../components/uiComp/spinner/Spinner';
import DimensionService from '../../services/DimensionService';
import Dropdown from '../../components/uiComp/dropdown/Dropdown';

interface DropdownOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

const NewCutContent = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedWoodSheetDimensionID, setSelectedWoodSheetDimensionID] = useState(0);

    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pvcColor: '',
        isNotRotatable: false,
        woodSheetDimensionsID: selectedWoodSheetDimensionID,
    });

    const dimensionService = new DimensionService();

    const handleSelectedOption = (option: DropdownOption) => {
        const selectedDimensionID = Number(option.value);
        setSelectedWoodSheetDimensionID(selectedDimensionID);
        setFormData((prevFormData) => ({
            ...prevFormData,
            woodSheetDimensionsID: selectedDimensionID,
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            isNotRotatable: event.target.checked,
        }));
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const handleSaveButtonClick = async () => {
        setIsProcessing(true);

        try {
            const result = await dimensionService.SaveNewCutDimension<any>(formData);

            showToast(result.message, ToastStatusEnum.Success);
            navigate('/dimension/' + result.data);
        } catch (error) {
            let e = error as any;
            showToast(e.response.data.message, ToastStatusEnum.Error);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const result = await dimensionService.GetWoodSheetDimensions<WoodSheetDimension[]>();

                const newOptions = result.map((item) => ({
                    label: item.dimensions,
                    value: item.id.toString(),
                }));

                setOptions(newOptions);
                handleSelectedOption(newOptions[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

    return isLoading ? (
        <Spinner flex={true} />
    ) : (
        <div className="flex flex-col gap-4">
            <input
                className="base-input"
                type="text"
                placeholder="عنوان"
                value={formData.title}
                maxLength={64}
                onChange={(e) => handleInputChange('title', e.target.value)}
            />
            <input
                className="base-input"
                type="text"
                placeholder="توضیحات"
                maxLength={100}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <input
                className="base-input"
                type="text"
                placeholder="رنگ PVC مثال:همرنگ"
                maxLength={32}
                value={formData.pvcColor}
                onChange={(e) => handleInputChange('pvcColor', e.target.value)}
            />

            <Dropdown
                title={'ابعاد ورق'}
                options={options}
                defaultOption={options[0]}
                onSelectOption={(opt) => handleSelectedOption(opt)}
            />

            <div className="flex items-center justify-end w-full gap-2">
                <label
                    htmlFor="checkbox"
                    className="cursor-pointer">
                    برش از راه چوب
                </label>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={formData.isNotRotatable}
                    onChange={handleCheckboxChange}
                />
            </div>

            <Button
                text="ذخیره"
                onClick={handleSaveButtonClick}
                fullWidth={true}
                isDisabled={!formData.title}
                isBusy={isProcessing}
            />
        </div>
    );
};

export default NewCutContent;
