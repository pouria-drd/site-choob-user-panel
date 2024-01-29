interface NewUnitProjectDTO {
    title: string;
    description?: string;
}

interface UnitProjectModel {
    id: string;
    title: string;
    description?: string;
    isCalculated: boolean;
    Properties: UnitProjectPropsModel[];
}

interface UnitProjectPropsModel {
    index: number;
    name: string;
    value: string;
    valueId: number;
}
