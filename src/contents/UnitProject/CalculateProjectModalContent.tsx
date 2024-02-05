import { useEffect, useState } from 'react';
import ProjectPropSelect from './ProjectPropSelect';
import DimensionService from '../../services/DimensionService';
import Spinner from '../../components/uiComp/spinner/Spinner';

const CalculateProjectModalContent = ({ project, onCalculateClicked }: { project: UnitProjectModel; onCalculateClicked: (dto: CalculateUnitProjectDTO) => void }) => {
    const dimensionService = new DimensionService();

    const [isLoading, setIsLoading] = useState(true);

    const [woodSheetDimensions, setWoodSheetDimensions] = useState<WoodSheetDimension[]>([]);

    const [dto, setDTO] = useState<CalculateUnitProjectDTO>({ projectId: project.id, properties: [] });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            var dimensions = await dimensionService.GetWoodSheetDimensions<WoodSheetDimension[]>();

            setWoodSheetDimensions(dimensions);
        } catch (e) {}
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
        setDTO({
            projectId: project.id,
            properties: project.properties,
        });
    }, [project]);

    const handleDimensionSelectionChange = (dimensionId: number, propIndex: number) => {
        if (!dto) return;
        let props: UnitProjectPropsModel[] = [];

        dto.properties.forEach((p) => {
            if (p.index === propIndex) {
                p.value = dimensionId;
                p.valueId = dimensionId;
                p.valueString = 'changed';
            }

            props.push(p);
        });

        setDTO((prevDTO) => ({
            ...prevDTO,
            properties: props,
        }));
    };

    const calculationClicked = () => {
        onCalculateClicked(dto);
    };

    return (
        <div className="flex flex-col gap-2 justify-center w-full  p-2 r2l">
            {isLoading && <Spinner flex={true} />}
            {!isLoading && (
                <>
                    {project.properties.map((p, index) => (
                        <ProjectPropSelect
                            onSelectionChanged={handleDimensionSelectionChange}
                            prop={p}
                            dimensionsList={woodSheetDimensions}
                            key={index}
                        />
                    ))}
                    <button
                        onClick={calculationClicked}
                        className="base-button primary">
                        محاسبه
                    </button>
                </>
            )}
        </div>
    );
};

export default CalculateProjectModalContent;
