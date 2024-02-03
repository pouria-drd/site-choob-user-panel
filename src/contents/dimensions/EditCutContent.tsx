import { ReactNode, useState, useEffect } from 'react';
import { useConfirmModal } from '../../components/uiComp/modals/ConfirmModalProvider';
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

const EditCutContent = ({ dimension, onUpdate }: { dimension: DimensionDetailModel; onUpdate: () => void }) => {
    const { showToast } = useToast();
    const { showConfirmModal } = useConfirmModal();

    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedWoodSheetDimensionID, setSelectedWoodSheetDimensionID] = useState(0);

    const [options, setOptions] = useState<DropdownOption[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pvcColor: '',
        woodSheetDimensionsID: selectedWoodSheetDimensionID,
        isNotRotatable: false,
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

    const handleCheckboxChange = (event?: React.ChangeEvent<HTMLInputElement>, isChecked = false) => {
        if (!event) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                isNotRotatable: isChecked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                isNotRotatable: event.target.checked,
            }));
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const handleShowConfirm = () => {
        const msg = 'آیا می خواهید بروزرسانی کنید؟';
        showConfirmModal(msg, () => handleSaveButtonClick(), undefined);
    };

    const handleSaveButtonClick = async () => {
        setIsProcessing(true);

        try {
            const result = await dimensionService.UpdateCutDimension<any>(formData, dimension.id);
            showToast(result.message, ToastStatusEnum.Success);
            onUpdate();
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

                const relatedDimensionOption = newOptions.find((op) => op.value === dimension.woodSheetDimensionsId.toString());

                handleSelectedOption(relatedDimensionOption ?? newOptions[0]);

                handleInputChange('title', dimension.title);
                handleInputChange('description', dimension.description);
                handleInputChange('pvcColor', dimension.pvcColor);

                handleCheckboxChange(undefined, dimension.isNotRotatable);
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
                defaultOption={options.find((op) => op.value === dimension.woodSheetDimensionsId.toString())}
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
                text="بروزرسانی"
                onClick={handleShowConfirm}
                fullWidth={true}
                isDisabled={!formData.title}
                isBusy={isProcessing}
            />
        </div>
    );
};

export default EditCutContent;
