interface NewUnitProjectDTO {
    title: string;
    description?: string;
}

interface UnitProjectModel {
    id: string;
    title: string;
    description?: string;
    isCalculated: boolean;
    properties: UnitProjectPropsModel[];
}
interface UnitProjectPropertiesModel {
    userGuid: string;
    properties: UnitProjectPropsModel[];
}

interface UnitProjectPropsModel {
    index: number;
    name: string;
    title: string;
    valueString: string;
    value: number;
    valueId: number;
    valueType: string;
}

interface UnitProjectDTO {
    project: UnitProjectModel;
    dimensions: UnitProjectDimensionsModel[];
}

interface UnitProjectDimensionsModel {
    id: string;
    projectId: string;
    count: number;
    dimensions: DimensionCutModel[];
    properties: UnitProjectDimensionsPropsModel[];
}

interface UnitProjectDimensionsPropsModel {
    name: string;
    title?: string;
    value: string;
}

interface UnitProjectDimensionPropParsed {
    title: string;
    description: string;
    details: string;
}

interface UnitPropsDTO {
    name: string;
    description: string;
    image: string;
    index: number;
}
