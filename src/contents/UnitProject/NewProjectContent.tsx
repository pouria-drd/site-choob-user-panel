import { useEffect, useState } from 'react';
import ProjectPropSelect from './ProjectPropSelect';
import DimensionService from '../../services/DimensionService';
import Spinner from '../../components/uiComp/spinner/Spinner';
import UnitProjectService from '../../services/UnitProjectService';
import { ToastStatusEnum, useToast } from '../../components/uiComp/Toast/ToastProvider';
import Button from '../../components/uiComp/buttons/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/uiComp/Inputs/Input';

const NewProjectContent = () => {
    const dimensionService = new DimensionService();
    const unitProjectService = new UnitProjectService();

    const navigate = useNavigate();
    const { showToast } = useToast();

    const [isLoading, setIsLoading] = useState(true);
    const [isSendingRequest, setIsSendingRequest] = useState(false);

    const [woodSheetDimensions, setWoodSheetDimensions] = useState<WoodSheetDimension[]>([]);

    const [projectProps, setProjectProps] = useState<UnitProjectPropsModel[]>([]);

    const defaultDTO: NewUnitProjectDTO = {
        title: '',
        properties: [],
    };
    const [dto, setDTO] = useState<NewUnitProjectDTO>(defaultDTO);

    const handleInputChange = (fieldName: keyof NewUnitProjectDTO, value: string) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, [fieldName]: value };
        });
    };

    const handleDimensionIdChange = (value: UnitProjectPropsModel[]) => {
        setDTO((prevDTO) => {
            return { ...prevDTO, properties: value };
        });
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            var dimensions = await dimensionService.GetWoodSheetDimensions<WoodSheetDimension[]>();

            setWoodSheetDimensions(dimensions);

            var projectProps = await unitProjectService.GetDefaultProjectPorps<UnitProjectPropsModel[]>();

            if (projectProps) {
                setProjectProps(projectProps);
                handleDimensionIdChange(projectProps);
            }
        } catch (e) {}
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleDimensionSelectionChange = (dimensionId: number, propIndex: number) => {
        if (!dto) return;
        let props: UnitProjectPropsModel[] = [];

        dto.properties.forEach((p) => {
            if (p.index === propIndex) {
                p.value = dimensionId;
                p.valueId = dimensionId;
            }

            props.push(p);
        });

        setDTO((prevDTO) => ({
            ...prevDTO,
            properties: props,
        }));
    };

    const handleSave = async () => {
        setIsSendingRequest(true);
        if (!dto.title) {
            showToast('عنوان را وارد کنید', ToastStatusEnum.Warning, 'خطا');
            setIsSendingRequest(false);
            return;
        }

        const emptyProp = dto.properties.filter((x) => !x.value || !x.valueId);

        if (emptyProp.length > 0) {
            showToast(`ابعاد ورق ${emptyProp[0].title} را انتخاب کنید`, ToastStatusEnum.Warning, 'خطا');
            setIsSendingRequest(false);
            return;
        }

        try {
            var result = await unitProjectService.CreateNewUnitProject<any>(dto);

            if (result.status) {
                showToast('پروژه جدید با موفقیت ایجاد شد.', ToastStatusEnum.Success, '...');
                navigate('/unit-project/' + result.data);
            } else {
                showToast(result.message, ToastStatusEnum.Error, 'خطا');
            }
        } catch (e: any) {}
        setIsSendingRequest(false);
    };

    return (
        <div className="flex flex-col gap-2 justify-center w-full md:w-[500px]  p-2 r2l">
            {isLoading && <Spinner flex={true} />}
            {!isLoading && projectProps && projectProps.length > 0 && (
                <div className="flex flex-col gap-4">
                    <Input
                        label="عنوان پروژه"
                        onValueChange={(v) => handleInputChange('title', v)}
                    />

                    <Input
                        label="توضیحات (اختیاری)"
                        onValueChange={(v) => handleInputChange('description', v)}
                    />

                    {projectProps.map((p, index) => (
                        <ProjectPropSelect
                            onSelectionChanged={handleDimensionSelectionChange}
                            prop={p}
                            dimensionsList={woodSheetDimensions}
                            key={index}
                        />
                    ))}
                    <Button
                        text="ذخیره"
                        onClick={handleSave}
                        isBusy={isSendingRequest}
                    />
                </div>
            )}
        </div>
    );
};

export default NewProjectContent;
