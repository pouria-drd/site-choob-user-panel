interface AddUnitDTO {
    projectId: string;
    name: string;
    count: number;
    description?: string;
    details: string;
    properties: UnitProjectDimensionsPropsModel[];
    dimensions: DimensionCutModel[];
}
